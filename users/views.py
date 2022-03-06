from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from users.models import User
from users.serializers import UserModelSerializer


# Create your views here.

class UserModelViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
