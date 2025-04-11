from django.contrib import admin
from .models import InterviewQuestion

@admin.register(InterviewQuestion)
class InterviewQuestionAdmin(admin.ModelAdmin):
    list_display = ('company_name', 'college', 'year_asked', 'job_role')
    list_filter = ('company_name', 'college', 'year_asked')
    search_fields = ('question_text', 'company_name', 'college', 'job_role')
