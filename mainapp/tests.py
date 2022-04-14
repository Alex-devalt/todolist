from django.contrib.auth import get_user_model
from django.test import TestCase
import json
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APITestCase, RequestsClient
from mixer.backend.django import mixer
from .views import ProjectModelViewSet
from .models import Project, Todo


class TestSetUp(TestCase):
    factory = APIRequestFactory()
    url = '/api/projects/'
    project = {'name': 'django', 'github_url': 'https://github.com/geekbrains'}
    client = APIClient()


class TestUserViewSet(TestSetUp):
    def test_get_list(self):
        request = self.factory.get(self.url)
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_anonimous(self):
        request = self.factory.post(self.url, self.project)
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self):
        request = self.factory.post(self.url, self.project)
        admin = get_user_model().objects.create_superuser('admin', 'admin@yandex.ru', 'admin789')
        force_authenticate(request, admin)
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_detail(self):
        test_project = Project.objects.create(name='django', github_url='https://github.com/geekbrains')
        response = self.client.get(f'{self.url}{test_project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_anonimous(self):
        test_project = Project.objects.create(name='Alt', github_url='https://github.com/geekbrains')
        response = self.client.put(f'{self.url}{test_project.id}/', self.project)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_edit_admin(self):
        test_project = Project.objects.create(name='Alts', github_url='https://github.com/geekbrains')
        admin = get_user_model().objects.create_superuser('admin777', 'admin777@yandex.ru', 'admin987')
        client = APIClient()
        client.login(username='admin777', password='admin987')
        response = client.put(f'{self.url}{test_project.id}/', self.project)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project = Project.objects.get(id=test_project.id)
        self.assertEqual(project.name, 'Zapad projekt')
        self.assertEqual(project.github_url, 'https://github.com/geekbrains')
        client.logout()


class TestProjectsViewSet(APITestCase):
    def test_get_list(self):
        response = self.client.get('/api/projects/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_admin(self):
        test_project = Project.objects.create(name='ognajd', github_url='https://github.com/geekbrains')
        admin = get_user_model().objects.create_superuser('admin777', 'admin777@yandex.ru', 'admin987')
        self.client.login(username='admin777', password='admin987')
        response = self.client.put(f'/api/projects/{test_project.id}/', {
            'name': 'vostok1',
            'github_url': 'https://github.com/a'
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project = Project.objects.get(id=test_project.id)
        self.assertEqual(project.name, 'vostok1')

    def test_edit_mixer(self):
        test_project = mixer.blend(Project)
        admin = get_user_model().objects.create_superuser('admin777', 'admin777@ad.ru', 'admin987')
        self.client.login(username='admin777', password='admin987')
        response = self.client.put(f'/api/projects/{test_project.id}/', {
            'name': 'a1',
            'github_url': 'https://github.com/geekbrains'
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project = Project.objects.get(id=test_project.id)
        self.assertEqual(project.name, 'acdc1')

    def test_get_detail(self):
        project = mixer.blend(Project, name='test project')
        response = self.client.get(f'/api/projects/{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_project = json.loads(response.content)
        self.assertEqual(response_project['name'], 'test project')

    def test_get_detail_user(self):
        todo = mixer.blend(Todo, project__name='Zapad')
        response = self.client.get(f'/api/todos/{todo.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_todo = json.loads(response.content)
        self.assertEqual(response_todo['project'], 'Zapad')


class TestLive(TestSetUp):

    def test_create_live(self):
        client = RequestsClient()
        admin = get_user_model().objects.create_superuser('admin777', 'admin777@yandex.ru', 'admin987')
        response = client.post('http://127.0.0.1:8000/api-token-auth/', json={"username": "admin777",
                                                                              "password": "admin987"})
        token = response.json()['token']
        response = client.post('http://127.0.0.1:8000/api/projects/', data={
            'name': 'Altcom',
            'github_url': 'https://github.com/geekbrains'
        }, headers={'Authorization': f'Token {token}'})
        assert response.status_code == 201
        response = client.get('http://127.0.0.1:8000/api/projects/')
        assert len(response.json()['results']) == 1


