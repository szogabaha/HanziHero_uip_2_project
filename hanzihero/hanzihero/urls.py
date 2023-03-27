from django.contrib import admin
from django.urls import path, include
from flashcards_api import urls as fc_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('decks/', include(fc_urls)),
]
