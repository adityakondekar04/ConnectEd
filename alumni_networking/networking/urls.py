from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('login-choice/', views.login_choice, name='login_choice'),
    path('login/', views.login_view, name='login'),
    path('register-choice/', views.register_choice, name='register_choice'),
    path('student-login/', views.student_login, name='student_login'),
    path('alumni-login/', views.alumni_login, name='alumni_login'),
    path('student-register/', views.student_register, name='student_register'),
    path('alumni-register/', views.alumni_register, name='alumni_register'),
    path('student-dashboard/', views.student_dashboard, name='student_dashboard'),
    path('alumni-dashboard/', views.alumni_dashboard, name='alumni_dashboard'),
]
