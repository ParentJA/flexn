from django.contrib.auth import get_user_model

from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class UserSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    def validate(self, data):
        if data['password1'] != data['password2']:
            raise serializers.ValidationError('Passwords must match.')
        return data

    def create(self, validated_data):
        data = {
            key: value for key, value in validated_data.items()
            if key not in ('password1', 'password2')
        }
        data['password'] = validated_data['password1']
        user = self.Meta.model.objects.create_user(**data)
        user.save()
        return user

    class Meta:
        model = get_user_model()
        fields = (
            'id', 'username', 'password1', 'password2', 'first_name', 'last_name', 'photo',
        )
        read_only_fields = ('id',)


class LogInSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        user_data = UserSerializer(user).data
        for key, value in user_data.items():
            if key != 'id':
                token[key] = value
        return token

'''
{
  'program': {
    'id': 1,
    'name': 'Warrior Strength Training Routine'
  },
  'last_workout': {
    'id': 1,
    'name': 'Workout A - Shoulders & Back'
  },
  'last_workout_same_type': {
    'id': 1,
    'name': 'Workout A - Shoulders & Back',
    'exercises': [
      {
        'id': 1,
        'is_completed': true,
        'name': 'Weighted Chin-up',
        'sets': [
          {
            'id': 1,
            'reps': 6
          }
        ]
      }
    ]
  }
}
'''

class UserProgramSerializer(serializers.ModelSerializer):
    pass


class CondensedUserWorkoutSerializer(serializers.ModelSerializer):
    pass


class UserSetSerializer(serializers.ModelSerializer):
    pass


class FullUserWorkoutSerializer(serializers.ModelSerializer):
    pass


class ProgressDataSerializer(serializers.Serializer):
    program = UserProgramSerializer()
    last_workout = CondensedUserWorkoutSerializer()
    last_workout_same_type = FullUserWorkoutSerializer()
    next_workout_id = serializers.IntegerField()


class ErrorSerializer(serializers.Serializer):
    # error_code = serializers.ChoiceField()
    error_code = serializers.CharField()
    error_message = serializers.CharField()


class UserProgressSerializer(serializers.Serializer):
    data = ProgressDataSerializer()
    errors = ErrorSerializer(many=True)