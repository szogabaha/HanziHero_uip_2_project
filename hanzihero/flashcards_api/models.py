from django.db import models
from django.contrib.auth.models import User

class Deck(models.Model):
    
    name = models.TextField(max_length=200, default="New deck", blank=True, null=False) #TODO move constants
    description = models.TextField(max_length=3000, blank=True, null=False) #TODO move constant
    user = models.ForeignKey(User, on_delete= models.CASCADE, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    last_revised = models.DateTimeField(null=True)

    def __str__(self):
        return f"{self.name}, {self.created_at}"
    

class Status(models.TextChoices):
        LEARNT = "learnt"
        REVISE = "needs revise"
        NOT_KNOWN = "not known"

class Card(models.Model):

    deck = models.ForeignKey(Deck, on_delete=models.CASCADE, related_name='cards', null=False)
    meaning = models.TextField(max_length=100, null=False) #TODO move constants
    characters = models.TextField(max_length=100, null=False)
    pronounciation = models.TextField(max_length=100, null=False)
    status = models.TextField(choices=Status.choices, null=False, default=Status.NOT_KNOWN)

    def __str__(self):
        return f"{self.deck}: {self.meaning}, ({self.status})"
