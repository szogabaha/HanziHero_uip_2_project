from rest_framework import serializers
from .models import Card, Deck, Status
from rest_auth.serializers import UserDetailsSerializer


class CardSerializer(serializers.ModelSerializer):

    class Meta:
        model = Card
        fields = "__all__"

class FullDeckSerializer(serializers.ModelSerializer):
    cards = CardSerializer(many=True, read_only = True)
    
    class Meta:
        model = Deck
        fields = "__all__"

class DeckInfoSerializer(serializers.ModelSerializer):
    
    def get_learnt_cnt(self, deck):
        return deck.cards.filter(status = Status.LEARNT).count()
    
    def get_not_known_cnt(self, deck):
        return deck.cards.filter(status = Status.NOT_KNOWN).count()
    
    def get_revising_cnt(self, deck):
        return deck.cards.filter(status = Status.REVISE).count()

    learnt_cnt : int = serializers.SerializerMethodField("get_learnt_cnt")
    revise_cnt : int = serializers.SerializerMethodField("get_revising_cnt")
    not_known  : int = serializers.SerializerMethodField("get_not_known_cnt")

    class Meta:
        model = Deck
        fields = "__all__"

class UserSerializer(UserDetailsSerializer):

    language = serializers.CharField(source="userprofile.language")

    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + ('language',)

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('userprofile', {})
        language = profile_data.get('language')

        instance = super(UserSerializer, self).update(instance, validated_data)

        # get and update user profile
        profile = instance.userprofile
        if profile_data and language:
            profile.language = language
            profile.save()
        return instance