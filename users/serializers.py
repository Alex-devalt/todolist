from rest_framework import serializers
from rest_framework.serializers import HyperlinkedModelSerializer

from users.models import User


class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'uid')


# API versioning test
class UserModelBaseSerializer(serializers.ModelSerializer):
    fullname = serializers.SerializerMethodField('get_fullname')

    class Meta:
        model = User
        fields = ('fullname',)

    @staticmethod
    def get_fullname(user):
        return user.first_name + ' ' + user.last_name
