from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from datetime import datetime

class InterviewQuestion(models.Model):
    question_text = models.TextField()
    answer = models.TextField(blank=True)  # New field for answers
    college = models.CharField(max_length=200)
    company_name = models.CharField(max_length=200)
    year_asked = models.IntegerField(
        validators=[
            MinValueValidator(2000),
            MaxValueValidator(datetime.now().year)
        ]
    )
    job_role = models.CharField(max_length=200, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.company_name} - {self.question_text[:50]}..."
