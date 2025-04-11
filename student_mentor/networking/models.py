from django.db import models
from django.contrib.auth.models import User

# Student Profile Model
class StudentProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    university_name = models.CharField(max_length=255)
    CURRENT_YEAR_CHOICES = [
        ('1st', '1st'),
        ('2nd', '2nd'),
        ('3rd', '3rd'),
        ('4th', '4th'),
        ('Graduate', 'Graduate'),
    ]
    current_year_of_study = models.CharField(max_length=10, choices=CURRENT_YEAR_CHOICES)
    DEGREE_CHOICES = [
        ('B.Tech', 'B.Tech'),
        ('BBA', 'BBA'),
        ('MBA', 'MBA'),
        ('M.Tech', 'M.Tech'),
        # add more if needed
    ]
    degree_program = models.CharField(max_length=50, choices=DEGREE_CHOICES)

    def __str__(self):
        return f"{self.user.username} - Student Profile"


# Alumni Profile Model
class AlumniProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    linkedin_url = models.URLField(blank=True, null=True)
    # For simplicity, graduation_year will be a CharField with choices (e.g., 2010-Present)
    GRADUATION_YEAR_CHOICES = [(str(year), str(year)) for year in range(2010, 2030)]
    graduation_year = models.CharField(max_length=4, choices=GRADUATION_YEAR_CHOICES)
    
    # Career & Industry Details
    current_job_title = models.CharField(max_length=255)
    current_company = models.CharField(max_length=255)
    INDUSTRY_CHOICES = [
        ('Tech', 'Tech'),
        ('Finance', 'Finance'),
        ('Consulting', 'Consulting'),
        ('Marketing', 'Marketing'),
        # add more as needed
    ]
    industry = models.CharField(max_length=50, choices=INDUSTRY_CHOICES)
    previous_companies = models.CharField(max_length=500, blank=True, null=True)
    YEARS_OF_EXPERIENCE_CHOICES = [
        ('1-3', '1-3'),
        ('4-6', '4-6'),
        ('7-10', '7-10'),
        ('10+', '10+'),
    ]
    years_of_experience = models.CharField(max_length=10, choices=YEARS_OF_EXPERIENCE_CHOICES)

    # Mentorship & Networking
    willing_to_mentor = models.BooleanField(default=False)
    NUMBER_OF_MENTEES_CHOICES = [
        ('1', '1'),
        ('3', '3'),
        ('5', '5'),
        ('Unlimited', 'Unlimited'),
    ]
    number_of_mentees = models.CharField(max_length=10, choices=NUMBER_OF_MENTEES_CHOICES, blank=True, null=True)
    
    MENTORSHIP_TYPE_CHOICES = [
        ('Career Guidance', 'Career Guidance'),
        ('Resume & Interview Prep', 'Resume & Interview Prep'),
        ('Startups & Entrepreneurship', 'Startups & Entrepreneurship'),
        ('Technical Skills & Projects', 'Technical Skills & Projects'),
    ]
    preferred_mentorship_type = models.CharField(max_length=50, choices=MENTORSHIP_TYPE_CHOICES, blank=True, null=True)
    
    COMMUNICATION_MODE_CHOICES = [
        ('Email', 'Email'),
        ('Platform Messaging', 'Platform Messaging'),
        ('Video Calls', 'Video Calls'),
    ]
    preferred_communication_mode = models.CharField(max_length=50, choices=COMMUNICATION_MODE_CHOICES, blank=True, null=True)
    
    AVAILABILITY_CHOICES = [
        ('1-2 hours', '1-2 hours'),
        ('3-5 hours', '3-5 hours'),
        ('6+ hours', '6+ hours'),
    ]
    availability = models.CharField(max_length=20, choices=AVAILABILITY_CHOICES, blank=True, null=True)
    
    # Community Contributions
    post_jobs = models.BooleanField(default=False)
    host_webinars = models.BooleanField(default=False)
    
    # Additional Preferences
    TOPICS_OF_INTEREST_CHOICES = [
        ('Career Growth', 'Career Growth'),
        ('Leadership & Management', 'Leadership & Management'),
        ('Tech & Coding', 'Tech & Coding'),
        ('Design & UX', 'Design & UX'),
        ('Entrepreneurship', 'Entrepreneurship'),
        ('Research & Higher Studies', 'Research & Higher Studies'),
    ]
    topics_of_interest = models.CharField(max_length=255, blank=True, null=True)  # could be comma-separated
    receive_newsletter = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username} - Alumni Profile"
