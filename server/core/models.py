from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    '''
    
    '''
    
    photo = models.ImageField(blank=True, null=True, upload_to='photos') 


class Program(models.Model):
    '''
    
    '''

    # Warrior Strength Training Routine
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    duration_in_days = models.PositiveIntegerField()
    total_workouts = models.PositiveIntegerField()

    def __str__(self):
        return f'{self.id}'


class UserProgram(models.Model):
    '''
    
    '''

    # Jason
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    # Warrior Strength Training Routine
    program = models.ForeignKey('core.Program', on_delete=models.CASCADE)
    # True
    is_completed = models.BooleanField()
    # 2022-01-16T22:00:00
    start_ts = models.DateTimeField(auto_created=True)
    # 2022-01-16T23:00:00
    end_ts = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f'{self.id}'


class Workout(models.Model):
    '''
    
    '''

    # Warrior Strength Training Routine
    program = models.ForeignKey('core.Program', on_delete=models.CASCADE)
    # Workout A - Shoulders & Back
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    # 1
    rank = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f'{self.id}'


class UserWorkout(models.Model):
    '''
    
    '''

    # Warrior Strength Training Routine
    user_program = models.ForeignKey('core.UserProgram', on_delete=models.CASCADE)
    # Workout A - Shoulders & Back
    workout = models.ForeignKey('core.Workout', on_delete=models.CASCADE)
    # True
    is_completed = models.BooleanField()
    # 2022-01-16T22:00:00
    start_ts = models.DateTimeField(auto_created=True)
    # 2022-01-16T23:00:00
    end_ts = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f'{self.id}'


class Exercise(models.Model):
    '''
    
    '''

    # Weighted Chin-ups
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f'{self.id}'


class Set(models.Model):
    '''
    
    '''
    
    # Workout A - Shoulders & Back
    workout = models.ForeignKey('core.Workout', on_delete=models.CASCADE)
    # Weighted Chin-ups
    exercise = models.ForeignKey('core.Exercise', on_delete=models.CASCADE)
    # 4
    min_reps = models.PositiveIntegerField()
    # 6
    max_reps = models.PositiveIntegerField()
    # Reverse Pyramid Training (RPT)
    training_type = models.CharField(max_length=255)
    # 1
    rank = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f'{self.id}'


class UserSet(models.Model):
    '''
    
    '''

    # Warrior Strength Training Routine
    user_program = models.ForeignKey('core.UserProgram', on_delete=models.CASCADE)
    # Workout A - Shoulders & Back
    workout = models.ForeignKey('core.UserWorkout', on_delete=models.CASCADE)
    # Weighted Chin-ups
    exercise = models.ForeignKey('core.Exercise', on_delete=models.CASCADE)
    # 6
    reps = models.PositiveIntegerField()
    # 25
    weight = models.PositiveIntegerField()
    # True
    include_bodyweight = models.BooleanField()
    # True
    warm_up = models.BooleanField()

    def __str__(self):
        return f'{self.id}'
