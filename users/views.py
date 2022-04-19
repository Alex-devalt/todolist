from rest_framework import mixins, permissions, generics
from rest_framework.viewsets import ModelViewSet, GenericViewSet

from users.models import User
from users.serializers import UserModelSerializer, UserModelBaseSerializer

class UserModelAPIVersionView(generics.ListAPIView):
    permission_classes = (permissions.DjangoModelPermissionsOrAnonReadOnly,)
    queryset = User.objects.all()
    serializer_class = UserModelSerializer

    def get_serializer_class(self):
        if self.request.version == '2':
            return UserModelBaseSerializer
        return UserModelSerializer


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
