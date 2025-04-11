from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib import messages
from django.contrib.auth.models import User
from .forms import StudentRegistrationForm, AlumniRegistrationForm
from .models import StudentProfile, AlumniProfile
import os
import openpyxl



EXCEL_FILE_PATH = os.path.join(os.path.dirname(__file__), 'data', 'users.xlsx')

def save_to_excel(user_type, user_data):
    """Function to save user details to an Excel sheet"""
    if not os.path.exists(EXCEL_FILE_PATH):
        # Create a new workbook & sheet
        wb = openpyxl.Workbook()
        sheet = wb.active
        sheet.title = "Users"

        # Define column headers
        headers = [
            "User Type", "Full Name", "Username", "Email", "University/Company",
            "Degree/Job Title", "Year of Study/Graduation Year"
        ]
        sheet.append(headers)
        wb.save(EXCEL_FILE_PATH)

    # Open existing workbook
    wb = openpyxl.load_workbook(EXCEL_FILE_PATH)
    sheet = wb.active

    # Append user data
    sheet.append(user_data)
    wb.save
# Home Page: shows "Let's Get Started" button
def home(request):
    return render(request, 'home.html')

# Login Choice: lets user choose Student or Alumni login
def login_choice(request):
    return render(request, 'login_choice.html')

# Combined Login Page - Will detect whether user is student or alumni
def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            # Check if the user is a student or alumni and redirect accordingly
            if hasattr(user, 'studentprofile'):
                return redirect('student_dashboard')
            elif hasattr(user, 'alumniprofile'):
                return redirect('alumni_dashboard')
            else:
                messages.error(request, "Your account is not properly configured.")
        else:
            messages.error(request, "Invalid username or password.")
    
    return render(request, 'login.html')

# Registration Choice Page
def register_choice(request):
    return render(request, 'register_choice.html')

# Student Login Page
def student_login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)

        if user is not None and hasattr(user, 'studentprofile'):
            login(request, user)
            return redirect('student_dashboard')
        else:
            messages.error(request, "Invalid credentials or not registered as a student.")
    return render(request, 'student_login.html')

# Alumni Login Page
def alumni_login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)

        if user is not None and hasattr(user, 'alumniprofile'):
            login(request, user)
            return redirect('alumni_dashboard')
        else:
            messages.error(request, "Invalid credentials or not registered as an alumni.")
    return render(request, 'alumni_login.html')

# Student Registration Page
def student_register(request):
    if request.method == 'POST':
        form = StudentRegistrationForm(request.POST)
        if form.is_valid():
            # Check if username already exists
            if User.objects.filter(username=form.cleaned_data['username']).exists():
                messages.error(request, "Username already exists. Choose a different one.")
                return redirect('student_register')

            # Create User
            user = User.objects.create_user(
                username=form.cleaned_data['username'],
                password=form.cleaned_data['password'],
                email=form.cleaned_data['email'],
                first_name=form.cleaned_data['full_name']
            )            # Create StudentProfile
            StudentProfile.objects.create(
                user=user,
                university_name=form.cleaned_data['university_name'],
                current_year_of_study=form.cleaned_data['current_year_of_study'],
                degree_program=form.cleaned_data['degree_program']
            )

            messages.success(request, "Registered successfully as student.")
            return redirect('login')

    else:
        form = StudentRegistrationForm()
    
    return render(request, 'student_register.html', {'form': form})

# Alumni Registration Page
def alumni_register(request):
    if request.method == 'POST':
        form = AlumniRegistrationForm(request.POST)
        if form.is_valid():
            # Check if username already exists
            if User.objects.filter(username=form.cleaned_data['username']).exists():
                messages.error(request, "Username already exists. Choose a different one.")
                return redirect('alumni_register')

            # Create User
            user = User.objects.create_user(
                username=form.cleaned_data['username'],
                password=form.cleaned_data['password'],
                email=form.cleaned_data['email'],
                first_name=form.cleaned_data['full_name']
            )

            # Handle optional multi-select fields safely
            topics_of_interest = form.cleaned_data.get('topics_of_interest', [])
            topics_str = ", ".join(topics_of_interest) if topics_of_interest else ""

            # Create AlumniProfile
            AlumniProfile.objects.create(
                user=user,
                linkedin_url=form.cleaned_data.get('linkedin_url', ''),
                graduation_year=form.cleaned_data['graduation_year'],
                current_job_title=form.cleaned_data['current_job_title'],
                current_company=form.cleaned_data['current_company'],
                industry=form.cleaned_data['industry'],
                previous_companies=form.cleaned_data.get('previous_companies', ''),
                years_of_experience=form.cleaned_data['years_of_experience'],
                willing_to_mentor=form.cleaned_data['willing_to_mentor'],
                number_of_mentees=form.cleaned_data.get('number_of_mentees', 0),
                preferred_mentorship_type=form.cleaned_data.get('preferred_mentorship_type', ''),
                preferred_communication_mode=form.cleaned_data.get('preferred_communication_mode', ''),
                availability=form.cleaned_data.get('availability', ''),
                post_jobs=form.cleaned_data['post_jobs'],
                host_webinars=form.cleaned_data['host_webinars'],                topics_of_interest=topics_str,
                receive_newsletter=form.cleaned_data['receive_newsletter']
            )

            messages.success(request, "Registered successfully as alumni.")
            return redirect('login')

    else:
        form = AlumniRegistrationForm()

    return render(request, 'alumni_register.html', {'form': form})

# Student Dashboard Page
def student_dashboard(request):
    return render(request, 'student_dashboard.html')

# Alumni Dashboard Page
def alumni_dashboard(request):
    return render(request, 'alumni_dashboard.html')
