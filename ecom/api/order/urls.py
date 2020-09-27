from rest_framework import routers
from django.urls import path, include

from .views import *

router = routers.DefaultRouter()
router.register('', OrderViewSet)

urlpatterns = [
    path('add/<str:id>/<str:token>/', add, name="order.add"),
    path('', include(router.urls)),
]
