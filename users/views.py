from rest_framework import mixins, permissions
from rest_framework.viewsets import ModelViewSet, GenericViewSet

from users.models import User
from users.serializers import UserModelSerializer


class UserModelViewSet(mixins.RetrieveModelMixin,
                       mixins.UpdateModelMixin,
                       mixins.ListModelMixin,
                       GenericViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = User.objects.all()
    serializer_class = UserModelSerializer

# class UserModelViewSet(ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserModelSerializer
