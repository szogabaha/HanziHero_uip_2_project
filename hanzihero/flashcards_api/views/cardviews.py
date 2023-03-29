import datetime
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from flashcards_api.models import Deck, Card, Status
from flashcards_api.serializers import CardSerializer
from flashcards_api.responses import create_pagable_list_response, filter_by_request_params
    
class CardsApi(GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    serializer_class = CardSerializer
    
    def get(self, request, deck_id, *args, **kwargs):
        """List cards of a deck.
        
        Filter by: status, deck
        Order-by (orderby) supported.
        
        """
        try:
            cards = Card.objects.filter(deck__pk=deck_id).all()
        except Deck.DoesNotExist or Card.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        orderby = request.GET.get("orderby")
        if orderby:
            cards = cards.order_by(orderby)
        cards = filter_by_request_params(request, cards, ["status", "deck"])
        return create_pagable_list_response(request, cards, CardSerializer)

    def post(self, request, deck_id, *args,**kwargs):
        """Add new card to a deck.
        
        Parameters to give: meaning, characters (rest is autofilled)
        """
        data = {
            'deck': deck_id,
            'meaning': request.data.get('meaning'),
            'characters': request.data.get('characters'),
            'status': Status.NOT_KNOWN,
            
        }
        serializer = CardSerializer(data = data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class CardDetailApi(GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CardSerializer

    def get(self, request, deck_id, card_id, *args, **kwargs):
        """Get information about a card."""
        try:
            card = Card.objects.get(pk=card_id, deck=deck_id)
        except Card.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = CardSerializer(card)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def patch(self, request, deck_id, card_id, *args, **kwargs):
        """Modify card.
        
        When this is called and the card's status is changed, the corresponding deck's last_revise field is also updated.
        Cannot change deck_id
        """
        try:
           card = Card.objects.get(pk=card_id, deck=deck_id)
        except Card.DoesNotExist:
           return Response(status=status.HTTP_404_NOT_FOUND)
        
        if "status" in request.data and card.status != request.data["status"]:
            deck = card.deck
            deck.last_revised = datetime.now()
        
        if "deck" in request.data:
            return Response("Deck cannot be changed.",status=status.HTTP_403_FORBIDDEN)
        serializer = CardSerializer(card, data = request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            deck.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, deck_id, card_id, *args, **kwargs):
        """Remove card"""

        try:
            card = Card.objects.get(pk=card_id, deck=deck_id)
        except Card.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        card.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class RevisionApi(GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CardSerializer

    def get(self, request, *args, **kwargs):
        """Get all cards of a user by status level.
        
        Request must containt a status parameter which can take values from {[c[0] for c in Status.choices]}
        Order-by (orderby) supported.
        """

        card_status = request.GET.get("status")
        if card_status not in [c[0] for c in Status.choices]:
            return Response(f"given status is not available, possible statuses: {[c[0] for c in Status.choices]}", status=status.HTTP_400_BAD_REQUEST)
        try:
            cards = Card.objects.filter(status = card_status, deck__user = request.user.id)
        except Card.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    
        orderby = request.GET.get("orderby")
        if orderby:
            cards = cards.order_by(orderby)
        
        serializer = CardSerializer(cards, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
