import base64
from io import BytesIO
import json

from django.contrib.auth import get_user_model
from django.core.files.uploadedfile import SimpleUploadedFile
from PIL import Image
from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase

PASSWORD = 'pAssw0rd!'


def create_user(username='user@example.com', password=PASSWORD):
    user = get_user_model().objects.create_user(
      username=username, 
      password=password,
    )
    user.save()
    return user


def create_photo_file():
    data = BytesIO()
    Image.new('RGB', (100, 100)).save(data, 'PNG')
    data.seek(0)
    return SimpleUploadedFile('photo.png', data.getvalue())


class AuthenticationTest(APITestCase):
    def test_user_can_sign_up(self):
        photo_file = create_photo_file()
        response = self.client.post(reverse('sign_up'), data={
            'username': 'user@example.com',
            'first_name': 'Test',
            'last_name': 'User',
            'password1': PASSWORD,
            'password2': PASSWORD,
            'photo': photo_file,
        })
        user = get_user_model().objects.last()

        # Test the response content
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)
        self.assertEqual(response.data['id'], user.id)
        self.assertEqual(response.data['username'], user.username)
        self.assertEqual(response.data['first_name'], user.first_name)
        self.assertEqual(response.data['last_name'], user.last_name)
        self.assertIsNotNone(user.photo)

    def test_user_can_log_in(self):
        user = create_user()
        response = self.client.post(reverse('log_in'), data={
            'username': user.username,
            'password': PASSWORD,
        })

        # Parse payload data from access token.
        access = response.data['access']
        _, payload, _ = access.split('.')
        decoded_payload = base64.b64decode(f'{payload}==')
        payload_data = json.loads(decoded_payload)

        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertIsNotNone(response.data['refresh'])
        self.assertEqual(payload_data['id'], user.id)
        self.assertEqual(payload_data['username'], user.username)
        self.assertEqual(payload_data['first_name'], user.first_name)
        self.assertEqual(payload_data['last_name'], user.last_name)


class ProgressViewProgramInProgressTest(APITestCase):
    def setUp(self):
        pass

    def test_user_has_no_workouts(self):
        pass

    def test_user_has_in_progress_workout_with_no_completed_workouts(self):
        pass

    def test_user_has_in_progress_workout_with_completed_workouts(self):
        pass

    def test_user_has_completed_first_workout(self):
        pass

    def test_user_has_several_completed_workouts(self):
        pass


class ProgressViewProgramNotInProgressTest(APITestCase):
    def setUp(self):
        pass
    
    def test_user_has_no_program_in_progress(self):
        pass
