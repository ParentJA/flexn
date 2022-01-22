from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models


class Program(models.Model):
    '''
    
    '''

    name = models.CharField(help_text='e.g. Warrior Strength Training Routine', max_length=255)
    description = models.TextField(blank=True, null=True)
    duration_in_days = models.PositiveIntegerField()
    total_workouts = models.PositiveIntegerField()

    def __str__(self):
        return f'{self.name}'


class Workout(models.Model):
    '''
    
    '''

    program = models.ForeignKey('core.Program', on_delete=models.CASCADE)
    name = models.CharField(help_text='e.g. Workout A - Shoulders & Back', max_length=255)
    description = models.TextField(blank=True, null=True)
    rank = models.PositiveIntegerField(default=1)

    class Meta:
        default_related_name = 'workouts'

    def __str__(self):
        return f'{self.program.name} | {self.name}'


class Exercise(models.Model):
    '''
    
    '''

    name = models.CharField(help_text='e.g. Weighted Chin-ups', max_length=255)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f'{self.name}'


class Set(models.Model):
    '''
    
    '''
    
    workout = models.ForeignKey('core.Workout', on_delete=models.CASCADE)
    exercise = models.ForeignKey('core.Exercise', on_delete=models.CASCADE)
    min_reps = models.PositiveIntegerField()
    max_reps = models.PositiveIntegerField()
    training_type = models.CharField(
        choices=(
            ('RPT', 'Reverse Pyramid Training',),
            ('SS', 'Straight Sets',),
        ), 
        help_text='e.g. Reverse Pyramid Training (RPT)', 
        max_length=255
    )
    rank = models.PositiveIntegerField(default=1)

    class Meta:
        default_related_name = 'sets'

    def __str__(self):
        return f'{self.exercise} | {self.min_reps}-{self.max_reps} reps'


class User(AbstractUser):
    '''
    
    '''
    
    photo = models.ImageField(blank=True, null=True, upload_to='photos') 


class UserProgram(models.Model):
    '''
    
    '''

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    program = models.ForeignKey('core.Program', on_delete=models.CASCADE)
    is_completed = models.BooleanField()
    start_ts = models.DateTimeField(auto_created=True)
    end_ts = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f'{self.user.username} | {self.program.name}'


class UserWorkout(models.Model):
    '''
    
    '''

    user_program = models.ForeignKey('core.UserProgram', on_delete=models.CASCADE)
    workout = models.ForeignKey('core.Workout', on_delete=models.CASCADE)
    is_completed = models.BooleanField()
    start_ts = models.DateTimeField(auto_created=True)
    end_ts = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f'{self.workout.name}'


class UserSet(models.Model):
    '''
    
    '''

    user_program = models.ForeignKey('core.UserProgram', on_delete=models.CASCADE)
    user_workout = models.ForeignKey('core.UserWorkout', on_delete=models.CASCADE)
    exercise = models.ForeignKey('core.Exercise', on_delete=models.CASCADE)
    reps = models.PositiveIntegerField()
    weight = models.PositiveIntegerField()
    include_bodyweight = models.BooleanField()
    warm_up = models.BooleanField()

    def __str__(self):
        return f'{self.id}'
