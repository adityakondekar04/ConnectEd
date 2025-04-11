from django.utils.decorators import method_decorator
from django.views.generic import ListView
from django.shortcuts import render, redirect
from django.http import HttpResponseForbidden
from .models import InterviewQuestion
from datetime import datetime
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
import json
import requests
from django.conf import settings

COMMON_COMPANIES = [
    "Google",
    "Microsoft",
    "Amazon",
    "TCS",
    "Infosys",
    "Wipro",
    "IBM",
    "Meta",
    "Apple"
]

def landing_page(request):
    if request.method == 'POST':
        user_role = request.POST.get('role')
        if user_role == 'student':
            request.session['role'] = 'student'
            return redirect('questions:question_list')
        elif user_role == 'alumni':
            request.session['role'] = 'alumni'
            return redirect('questions:submit_question')
    return render(request, 'questions/landing_page.html')

def restrict_access(role):
    def decorator(view_func):
        def wrapper(request, *args, **kwargs):
            if request.session.get('role') != role:
                return HttpResponseForbidden("You are not authorized to access this page.")
            return view_func(request, *args, **kwargs)
        return wrapper
    return decorator

@restrict_access('alumni')
def submit_question(request):
    if request.method == 'POST':
        # Create a new question from form data
        InterviewQuestion.objects.create(
            question_text=request.POST.get('question_text'),
            answer=request.POST.get('answer', ''),
            college=request.POST.get('college'),
            company_name=request.POST.get('company_name'),
            year_asked=request.POST.get('year_asked'),
            job_role=request.POST.get('job_role', '')
        )
        return redirect('questions:question_list')
    
    context = {
        'companies': COMMON_COMPANIES,
        'years': range(datetime.now().year, datetime.now().year - 5, -1)
    }
    return render(request, 'questions/submit_question.html', context)

@csrf_exempt
@require_http_methods(["POST"])
def generate_answer(request):
    try:
        data = json.loads(request.body)
        question = data.get('question', '')
        
        if not question:
            return JsonResponse({'error': 'Question is required'}, status=400)
        
        if not settings.OPENROUTER_API_KEY:
            return JsonResponse({'error': 'OpenRouter API key is not configured'}, status=500)
        
        # OpenRouter API endpoint
        url = "https://openrouter.ai/api/v1/chat/completions"
        
        # Request headers
        headers = {
            "Authorization": f"Bearer {settings.OPENROUTER_API_KEY}",
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:8000",  # Your site URL
        }
        
        # Request payload
        payload = {
            "model": "mistralai/mistral-7b-instruct",  # Using Mistral as default model
            "messages": [
                {
                    "role": "system",
                    "content": "You are a professional interviewer providing clear, accurate answers to technical interview questions."
                },
                {
                    "role": "user",
                    "content": f"Give a professional and concise answer to the following interview question: {question}"
                }
            ]
        }
        
        # Make request to OpenRouter API
        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status()  # Raise exception for bad status codes
        
        # Extract the generated answer from response
        response_data = response.json()
        generated_answer = response_data['choices'][0]['message']['content'].strip()
        
        return JsonResponse({'answer': generated_answer})
    except requests.exceptions.RequestException as e:
        return JsonResponse({'error': f'API request failed: {str(e)}'}, status=500)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

class QuestionListView(ListView):
    model = InterviewQuestion
    template_name = 'questions/question_list.html'
    context_object_name = 'questions'
    paginate_by = 10

    @method_decorator(restrict_access('student'))
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def get_queryset(self):
        queryset = super().get_queryset()
        college = self.request.GET.get('college')
        company = self.request.GET.get('company')

        if college:
            queryset = queryset.filter(college__icontains=college)
        if company:
            queryset = queryset.filter(company_name__icontains=company)

        return queryset

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['colleges'] = InterviewQuestion.objects.values_list('college', flat=True).distinct()
        context['companies'] = InterviewQuestion.objects.values_list('company_name', flat=True).distinct()
        context['selected_college'] = self.request.GET.get('college', '')
        context['selected_company'] = self.request.GET.get('company', '')
        return context
