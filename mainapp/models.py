from uuid import uuid4

from django.db import models
from users.models import User


class Project(models.Model):
    uid = models.UUIDField(primary_key=True, default=uuid4)
    name = models.CharField(max_length=128, verbose_name='НАЗВАНИЕ ПРОЕКТА')
    github_url = models.URLField(max_length=128, verbose_name='ССЫЛКА НА РЕПОЗИТОРИЙ')
    users = models.ManyToManyField(User)

    def __str__(self):
        return f'{self.name}'


class Todo(models.Model):
    uid = models.UUIDField(primary_key=True, default=uuid4)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, verbose_name='ПРОЕКТ')
    text = models.TextField(max_length=512, blank=True, verbose_name='ТЕКСТ ЗАМЕТКИ')
    author = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='АВТОР')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='СОЗДАНО')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='ОБНОВЛЕНО')
    is_active = models.BooleanField(default=True)

    def delete(self, using=None, keep_parents=False):
        self.is_active = False
