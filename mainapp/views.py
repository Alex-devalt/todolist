from django.shortcuts import render

# Create your views here.
from rest_framework.viewsets import ModelViewSet


from .pagination import ProjectLimitOffsetPagination, ToDoLimitOffsetPagination
from .filters import ProjectFilter, ToDoFilter
from mainapp.models import Project, Todo
from mainapp.serializers import ProjectModelSerializer, TodoModelSerializer


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    filterset_class = ProjectFilter
    pagination_class = ProjectLimitOffsetPagination


class TodoModelViewSet(ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoModelSerializer
    filterset_class = ToDoFilter
    pagination_class = ToDoLimitOffsetPagination
