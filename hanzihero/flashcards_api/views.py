from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import Deck, Card, Status
from .serializers import FullDeckSerializer, CardSerializer, DeckInfoSerializer
import  math



class DecksApi(APIView):
    queryset = Deck.objects.all()
    
    """Get all decks of a user, or filter by last_revised"""
    def get(self, request, *args, **kwargs):
        page_num = int(request.GET.get("page", 1))
        limit_num = int(request.GET.get("limit", 10))
        start_num = (page_num - 1) * limit_num
        end_num = limit_num * page_num
        search_param = request.GET.get("search") #TODO, what to search on?
        decks = Deck.objects.all()
        total_decks = decks.count()
        if search_param:
            decks = decks.filter(title__icontains=search_param)
        decks = DeckInfoSerializer(decks[start_num:end_num], many="true")
        return Response({
            "total": total_decks,
            "page": page_num,
            "last_page": math.ceil(total_decks / limit_num),
            "decks": decks.data}
            , status=status.HTTP_200_OK)

    """Create new deck"""
    def post(self, request, *args,**kwargs):

        data = {
            'name': request.data.get('name'),
            'description': request.data.get('description'),
            'user': request.user.id,
        }
        serializer = FullDeckSerializer(data = data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeckApi(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, deck_id, *args, **kwargs):
        try:
            deck = Deck.objects.get(pk=deck_id)
        except Deck.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = DeckInfoSerializer(deck)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
class CardsApi(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, deck_id, *args, **kwargs):
        try:
            cards = Deck.objects.get(pk=deck_id).cards
        except Deck.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = CardSerializer(cards, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, deck_id, *args,**kwargs):

        data = {
            'deck': deck_id,
            'meaning': request.data.get('meaning'),
            'characters': request.data.get('characters'),
            'pronounciation': request.data.get('pronounciation'),
            'status': Status.NOT_KNOWN,
            
        }
        serializer = CardSerializer(data = data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class CardApi(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, deck_id, card_id, *args, **kwargs):
        try:
            card = Card.objects.get(pk=card_id, deck=deck_id)
        except Card.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = CardSerializer(card)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def patch(self, request, deck_id, card_id, *args, **kwargs):
        try:
           card = Card.objects.get(pk=card_id, deck=deck_id)
        except Card.DoesNotExist:
           return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = CardSerializer(card, data = request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, deck_id, card_id, *args, **kwargs):
        try:
            card = Card.objects.get(pk=card_id, deck=deck_id)
        except Card.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        card.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    