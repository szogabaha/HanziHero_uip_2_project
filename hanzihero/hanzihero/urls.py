from django.contrib import admin
from django.urls import path, include
from flashcards_api import urls as fc_urls
# Swagger
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="Flashcards API",
        default_version='v1',
        description="The API for flashcards and it's authentication system.",
    ), #TODO, contact, license etc
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('auth/', include('rest_auth.urls')),
    path('auth/registration/', include('rest_auth.registration.urls')),
    path('decks/', include(fc_urls)),
    path('docs/', schema_view.with_ui('swagger', cache_timeout=0),
         name='schema-swagger-ui')
]
