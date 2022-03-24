from django_filters import rest_framework as filters

from .models import Project, Todo


class ProjectFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ('name',)


class ToDoFilter(filters.FilterSet):
    project_name = filters.CharFilter(field_name='project__name', lookup_expr='contains')
    date = filters.DateFromToRangeFilter(field_name='created_at')

    class Meta:
        model = Todo
        fields = ('project_name', 'date')
