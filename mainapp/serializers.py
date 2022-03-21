from rest_framework import serializers
from rest_framework.serializers import HyperlinkedModelSerializer

from mainapp.models import Project, Todo
from users.serializers import UserModelSerializer


class ProjectModelSerializer(HyperlinkedModelSerializer):
    users = serializers.StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class TodoModelSerializer(HyperlinkedModelSerializer):
    project = ProjectModelSerializer()
    author = UserModelSerializer(read_only=True)

    class Meta:
        model = Todo
        fields = ('project', 'author', 'created_at', 'updated_at', 'is_active', 'url')
