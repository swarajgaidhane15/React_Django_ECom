from rest_framework import routers
from django.urls import path, include

from .views import *

router = routers.DefaultRouter()
router.register('', CategoryViewSet)

urlpatterns = [
    path('', include(router.urls))
]
