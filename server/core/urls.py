from django.urls import path

from .views import ProgramDetailView, ProgramListView, UserProgressView

app_name = 'core'

urlpatterns = [
    path('program/<int:program_id>/', ProgramDetailView.as_view(), name='program_detail'),
    path('program/', ProgramListView.as_view(), name='program_list'),
    path('user/<int:user_id>/progress/', UserProgressView.as_view(), name='user_progress'),
]