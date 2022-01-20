from django.urls import path

from .views import UserProgressView

app_name = 'core'

urlpatterns = [
    path('<int:user_id>/progress/', UserProgressView.as_view(), name='user_progress'),
]