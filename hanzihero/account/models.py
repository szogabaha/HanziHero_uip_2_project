from django.db import models
from django.contrib.auth.models import User

class UserLanguage(models.TextChoices):
    CHINESE = "Chinese"
    JAPANESE = "Japanese"
    KOREAN = "Korean"   

class FlashcardsUser(models.Model):
    
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    language = language = models.TextField(choices=UserLanguage.choices, null=False, default=UserLanguage.CHINESE)
