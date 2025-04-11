from django import forms
from django.contrib.auth.models import User
from .models import StudentProfile, AlumniProfile

# Student Registration Form
class StudentRegistrationForm(forms.Form):
    username = forms.CharField(max_length=150)
    password = forms.CharField(widget=forms.PasswordInput)
    full_name = forms.CharField(max_length=255)
    email = forms.EmailField()
    university_name = forms.CharField(max_length=255)
    current_year_of_study = forms.ChoiceField(choices=StudentProfile.CURRENT_YEAR_CHOICES)
    degree_program = forms.ChoiceField(choices=StudentProfile.DEGREE_CHOICES)

# Alumni Registration Form
class AlumniRegistrationForm(forms.Form):
    username = forms.CharField(max_length=150)
    password = forms.CharField(widget=forms.PasswordInput)
    full_name = forms.CharField(max_length=255)
    email = forms.EmailField()
    linkedin_url = forms.URLField(required=False)
    graduation_year = forms.ChoiceField(choices=AlumniProfile.GRADUATION_YEAR_CHOICES)
    
    # Career & Industry Details
    current_job_title = forms.CharField(max_length=255)
    current_company = forms.CharField(max_length=255)
    industry = forms.ChoiceField(choices=AlumniProfile.INDUSTRY_CHOICES)
    previous_companies = forms.CharField(max_length=500, required=False)
    years_of_experience = forms.ChoiceField(choices=AlumniProfile.YEARS_OF_EXPERIENCE_CHOICES)
    
    # Mentorship & Networking
    willing_to_mentor = forms.BooleanField(required=False)
    number_of_mentees = forms.ChoiceField(choices=AlumniProfile.NUMBER_OF_MENTEES_CHOICES, required=False)
    preferred_mentorship_type = forms.ChoiceField(choices=AlumniProfile.MENTORSHIP_TYPE_CHOICES, required=False)
    preferred_communication_mode = forms.ChoiceField(choices=AlumniProfile.COMMUNICATION_MODE_CHOICES, required=False)
    availability = forms.ChoiceField(choices=AlumniProfile.AVAILABILITY_CHOICES, required=False)
    
    # Community Contributions
    post_jobs = forms.BooleanField(required=False)
    host_webinars = forms.BooleanField(required=False)
    
    # Additional Preferences
    topics_of_interest = forms.MultipleChoiceField(
        choices=AlumniProfile.TOPICS_OF_INTEREST_CHOICES,
        widget=forms.CheckboxSelectMultiple,
        required=False
    )
    receive_newsletter = forms.BooleanField(required=False)
