from django.urls import path
from .views import UserModelAPIVersionView

app_name = 'users'

urlpatterns = [
    path('', UserModelAPIVersionView.as_view()),
]