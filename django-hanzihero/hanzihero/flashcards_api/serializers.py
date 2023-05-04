from rest_framework import serializers
from .models import Card, Deck, Status, UserProfile, CardLanguage
from rest_auth.serializers import UserDetailsSerializer
from rest_auth.registration.serializers import RegisterSerializer
from django.db import transaction, IntegrityError


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = "__all__"


class FullDeckSerializer(serializers.ModelSerializer):
    cards = CardSerializer(many=True, read_only=True)

    class Meta:
        model = Deck
        fields = "__all__"


class DeckInfoSerializer(serializers.ModelSerializer):
    def get_learnt_cnt(self, deck):
        return deck.cards.filter(status=Status.LEARNT).count()

    def get_not_known_cnt(self, deck):
        return deck.cards.filter(status=Status.NOT_KNOWN).count()

    def get_revising_cnt(self, deck):
        return deck.cards.filter(status=Status.REVISE).count()

    learnt_cnt: int = serializers.SerializerMethodField("get_learnt_cnt")
    revise_cnt: int = serializers.SerializerMethodField("get_revising_cnt")
    not_known: int = serializers.SerializerMethodField("get_not_known_cnt")

    class Meta:
        model = Deck
        fields = "__all__"


class FlashcardUserSerializer(UserDetailsSerializer):

    language = serializers.CharField(source="userprofile.language")

    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + ("language",)

    def update(self, instance, validated_data):
        profile_data = validated_data.pop("userprofile", {})
        language = profile_data.get("language")

        instance = super(FlashcardUserSerializer, self).update(instance, validated_data)

        # get and update user profile
        profile = instance.userprofile
        if profile_data and language:
            profile.language = language
            profile.save()
        return instance


class FlashcardUserRegisterSerializer(RegisterSerializer):
    language = serializers.ChoiceField(CardLanguage.choices)

    def save(self, request):
        try:
            with transaction.atomic():
                user = super().save(request)
                language = request.data.get("language")
                if not language or language not in [c[0] for c in CardLanguage.choices]:
                    raise serializers.ValidationError("Invalid language input.")
                UserProfile.objects.create(language=language, user=user)
            return user
        except IntegrityError as e:
            raise serializers.ValidationError(e)
