# todo/todo_api/urls.py : API urls.py
from django.conf.urls import url
from django.urls import path, include
from .views import (
    DecksApi,
    DeckDetailApi,
    CardsApi,
    CardDetailApi,
    RevisionApi
    
)

urlpatterns = [
    path('', DecksApi.as_view()),
    path('<int:deck_id>/', DeckDetailApi.as_view()),
    path('<int:deck_id>/cards/', CardsApi.as_view()),
    path('<int:deck_id>/cards/<int:card_id>/', CardDetailApi.as_view()),
    path('revision/', RevisionApi.as_view())
]