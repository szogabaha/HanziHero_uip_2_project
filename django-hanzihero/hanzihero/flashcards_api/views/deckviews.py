from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from flashcards_api.models import Deck
from flashcards_api.serializers import FullDeckSerializer, DeckInfoSerializer
from flashcards_api.responses import (
    create_pagable_list_response,
    filter_by_request_params,
)


class DecksApi(GenericAPIView):
    queryset = Deck.objects.all()

    def get_serializer_class(self):
        """Override default getter, to use different serializers for different endpoints on the swagger UI."""

        serializer_action_classes = {
            "GET": DeckInfoSerializer,
            "POST": FullDeckSerializer,
        }
        try:
            return serializer_action_classes[self.request.method]
        except (KeyError, AttributeError):
            return super().get_serializer_class()

    def get(self, request, *args, **kwargs):
        """Get all decks of a user.

        Filter by: language
        Order-by (orderby) supported.

        """
        decks = Deck.objects.filter(user=request.user.id).all()

        orderby = request.GET.get("orderby")
        if orderby:
            decks = decks.order_by(orderby)

        decks = filter_by_request_params(request, decks, ["language"])
        return create_pagable_list_response(request, decks, DeckInfoSerializer)

    def post(self, request, *args, **kwargs):
        """Create new deck.

        User and last-revised fields will not be processed. Default color is White.
        """

        data = request.data
        data["user"] = request.user.id
        data["last_revised"] = None

        serializer = FullDeckSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeckDetailApi(GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        """Override default getter, to use different serializers for different endpoints on the swagger UI."""

        serializer_action_classes = {
            "GET": DeckInfoSerializer,
            "PATCH": FullDeckSerializer,
        }
        try:
            return serializer_action_classes[self.request.method]
        except (KeyError, AttributeError):
            return super().get_serializer_class()

    def get(self, request, deck_id, *args, **kwargs):
        """Get the given deck's information. Include revision statistics.

        Cards are not fetched by this query.
        """
        try:
            deck = Deck.objects.get(pk=deck_id)
        except Deck.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = DeckInfoSerializer(deck)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request, deck_id, *args, **kwargs):
        """Modify the given deck. Cannot modify containing cards.

        Only the users' own decks can be updated.
        """

        try:
            deck = Deck.objects.get(pk=deck_id)
        except Deck.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if deck.user.id != request.user.id or (
            "user" in request.data and request.data["user"] != deck.user.id
        ):
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        request.data["user"] = request.user.id
        serializer = FullDeckSerializer(deck, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, deck_id, *args, **kwargs):
        """Remove deck and corresponding cards."""
        try:
            deck = Deck.objects.get(pk=deck_id)
        except Deck.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        deck.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
