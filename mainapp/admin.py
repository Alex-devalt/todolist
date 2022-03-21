from django.contrib import admin

# Register your models here.
from mainapp.models import Todo, Project

admin.site.register(Project)

admin.site.register(Todo)
