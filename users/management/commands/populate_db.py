from django.core.management.base import BaseCommand
from django.db import transaction

from users.factory import UserFactory
from users.models import User


NUM_USERS = 50


class Command(BaseCommand):

    @transaction.atomic
    def handle(self, *args, **options):
        models = [User]
        for m in models:
            m.objects.all().delete()

        people = []
        for _ in range(NUM_USERS):
            person = UserFactory()
            people.append(person)

        if not User.objects.filter(username='django').exists():
            User.objects.create_superuser(username='django', email='admin@yandex.ru', password='ad123/')
