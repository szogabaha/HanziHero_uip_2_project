from django.urls import path
from .views.deckviews import (DecksApi, DeckDetailApi)
from .views.cardviews import (CardsApi, CardDetailApi,RevisionApi)

urlpatterns = [
    path('', DecksApi.as_view()),
    path('<int:deck_id>/', DeckDetailApi.as_view()),
    path('<int:deck_id>/cards/', CardsApi.as_view()),
    path('<int:deck_id>/cards/<int:card_id>/', CardDetailApi.as_view()),
    path('revision/', RevisionApi.as_view())
]