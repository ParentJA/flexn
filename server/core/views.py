from django.contrib.auth import get_user_model

from rest_framework import generics, permissions, views
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

# from .constants import ErrorCode
from .models import Program, Set, UserProgram, UserWorkout
from .serializers import (
    LogInSerializer, 
    ProgramSerializer, 
    ProgramDetailSerializer, 
    UserProgressSerializer, 
    UserSerializer,
)


class SignUpView(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer


class LogInView(TokenObtainPairView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = LogInSerializer


class ProgramListView(generics.ListAPIView):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer


class ProgramDetailView(views.APIView):
    def get(self, request, program_id):
        sets = Set.objects.select_related('workout__program', 'exercise').filter(workout__program_id=program_id)
        program = Program.objects.get(id=program_id)
        exercises = set()
        workouts = set()
        for set_ in sets:
            exercises.add(set_.exercise)
            workouts.add(set_.workout)
        serializer = ProgramDetailSerializer(data={
            'description': program.description,
            'duration_in_days': program.duration_in_days,
            'exercises': list(exercises),
            'name': program.name,
            'sets': list(sets),
            'total_workouts': program.total_workouts,
            'workouts': list(workouts),
        })
        serializer.is_valid(raise_exception=True)
        return Response(data=serializer.validated_data)


class UserProgressView(views.APIView):
    def get(self, request, user_id):
        serializer = UserProgressSerializer(data={
            'data': {
                'last_workout': None,
                'last_workout_same_type': None,
                'next_workout_id': None,
                'program': None,
            },
            'errors': [],
        })
        serializer.is_valid(raise_exception=True)
        return Response(data=serializer.validated_data)


# class UserProgressView(views.APIView):
#     def _get_last_workout_same_type(self):
#         pass

#     def get(self, request):
#         has_incomplete_user_program = UserProgram.objects.filter(user=request.user, is_completed=False).exists()
#         if has_incomplete_user_program:
#             latest_user_program = UserProgram.objects.select_related('program').filter(user=request.user, is_completed=False).latest()
#             user_workouts = list(UserWorkout.objects.select_related('workout').filter(user_program=latest_user_program).order_by('start_ts'))

#         else:
#             serializer = UserProgressSerializer(data={
#               'data': {
#                 'program': None,
#                 'last_workout': None,
#                 'last_workout_same_type': None,
#                 'next_workout_id': None,
#               },
#               'errors': [],
#             })
#             return Response(data=serializer.data)


#         # if incomplete_user_program_count > 1:
#         #     serializer = ProgressSerializer(data={
#         #       'data': {
#         #         'program': None,
#         #         'last_workout': None,
#         #         'last_workout_same_type': None,
#         #       },
#         #       'errors': [
#         #         {
#         #           'error_code': ErrorCode.TOO_MANY_PROGRAMS_IN_PROGRESS,
#         #           'error_message': 'You have too many programs in progress',
#         #         }
#         #       ],
#         #     })
#         #     return Response(data=serializer.data)
#         if incomplete_user_program_count == 1:
#             # User has a program still in progress
#             latest_user_program = UserProgram.objects.select_related('program').filter(user=request.user, is_completed=False).latest()
#             user_workouts = list(UserWorkout.objects.select_related('workout').filter(user_program=latest_user_program).order_by('start_ts'))
#             if len(user_workouts) == 0:
#                 last_workout = None
#                 last_workout_same_type = None
#             else:
#                 last_workout = user_workouts[-1]
#                 last_workout_rank = last_workout.workout.rank
#                 if not last_workout.is_completed:
#                     # User has a workout in progress
#                     # A B C A
#                     # ^     ^
#                     last_workout_index = len(user_workouts) - 1
#                     last_workout_same_type_index = last_workout_index - latest_user_program.program.total_workouts
#                     if last_workout_same_type_index >= 0:
#                         last_workout_same_type = user_workouts[last_workout_same_type_index]
#                     else:
#                         last_workout_same_type = None
#                 else:
#                     # User is ready for a new workout
#                     last_workout_rank = last_workout.workout.rank
#                     # A B C A _
#                     #   ^     ^
#                     next_workout_index = len(user_workouts)
#                     last_workout_same_type_index = next_workout_index - latest_user_program.program.total_workouts
#                     if last_workout_same_type_index >= 0:
#                         last_workout_same_type = user_workouts[last_workout_same_type_index]
#                     else:
#                         last_workout_same_type = None
#             serializer = ProgressSerializer(data={
#                 'data': {
#                     'program': {},
#                     'last_workout': {},
#                     'last_workout_same_type': {},
#                 },
#                 'errors': [],
#             })
#             return Response()

#         else:
#             # User has not started a program
#             serializer = ProgressSerializer(data={
#               'data': {
#                 'program': None,
#                 'last_workout': None,
#                 'last_workout_same_type': None,
#               },
#               'errors': [],
#             })
#             return Response(data=serializer.data)

#         user_programs = UserProgram.objects.select_related('program')
