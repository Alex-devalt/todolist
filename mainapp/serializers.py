from rest_framework import serializers
from rest_framework.relations import PrimaryKeyRelatedField
from rest_framework.serializers import HyperlinkedModelSerializer

from mainapp.models import Project, Todo
from users.models import User


class UserListingSerializer(PrimaryKeyRelatedField, serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']

    def to_representation(self, value):
        return f'{value.get_username()}'

    def to_internal_value(self, data):
        obj = User.objects.get(username=data)
        return obj


class AuthorListingSerializer(PrimaryKeyRelatedField, serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']

    def to_representation(self, value):
        author = User.objects.get(pk=value.pk)
        return author.username


class ProjectListingSerializer(PrimaryKeyRelatedField, serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['name']

    def to_representation(self, value):
        project = Project.objects.get(pk=value.pk)
        return project.name


class ProjectModelSerializer(HyperlinkedModelSerializer):
    users = UserListingSerializer(many=True, queryset=User.objects.all())

    class Meta:
        model = Project
        fields = '__all__'


class TodoModelSerializer(HyperlinkedModelSerializer):
    project = ProjectListingSerializer(queryset=Project.objects.all())
    author = AuthorListingSerializer(queryset=User.objects.all())

    class Meta:
        model = Todo
        fields = ('project', 'author', 'text', 'created_at', 'updated_at', 'is_active', 'url')
