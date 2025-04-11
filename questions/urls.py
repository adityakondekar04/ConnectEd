from django.urls import path

from . import views

app_name = 'questions'

urlpatterns = [
    path('', views.landing_page, name='landing_page'),  # Landing page route
    path('submit/', views.submit_question, name='submit_question'),
    path('questions/', views.QuestionListView.as_view(), name='question_list'),
    path('generate-answer/', views.generate_answer, name='generate_answer'),
]