# todo/todo_api/urls.py : API urls.py
from django.conf.urls import url
from django.urls import path, include
from .views import (
    DecksApi,
    DeckApi,
    CardsApi,
    CardApi
    
)

urlpatterns = [
    path('decks/', DecksApi.as_view()),
    path('decks/<int:deck_id>/', DeckApi.as_view()),
    path('decks/<int:deck_id>/cards/', CardsApi.as_view()),
    path('decks/<int:deck_id>/cards/<int:card_id>/', CardApi.as_view())
]