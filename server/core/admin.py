from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DefaultUserAdmin

from .models import Exercise, Program, Set, User, UserProgram, UserSet, UserWorkout, Workout


@admin.register(Program)
class ProgramAdmin(admin.ModelAdmin):
    fields = ('id', 'name', 'description', 'duration_in_days', 'total_workouts',)
    list_display = ('id', 'name', 'duration_in_days', 'total_workouts',)
    list_display_links = ('name',)
    readonly_fields = ('id',)
    ordering = ('id',)


@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
    fields = ('id', 'program', 'name', 'description', 'rank',)
    list_display = ('id', 'name', 'program',)
    list_display_links = ('name',)
    list_select_related = ('program',)
    readonly_fields = ('id',)
    ordering = ('id',)


@admin.register(Exercise)
class ExerciseAdmin(admin.ModelAdmin):
    fields = ('id', 'name', 'description',)
    list_display = ('id', 'name',)
    list_display_links = ('name',)
    readonly_fields = ('id',)
    ordering = ('id',)


@admin.register(Set)
class SetAdmin(admin.ModelAdmin):
    fields = ('id', 'workout', 'exercise', 'min_reps', 'max_reps', 'training_type', 'rank',)
    list_display = ('id', 'workout', 'exercise', 'min_reps', 'max_reps', 'training_type',)
    list_display_links = ('id',)
    list_select_related = ('workout', 'exercise',)
    readonly_fields = ('id',)
    ordering = ('id',)


@admin.register(User)
class UserAdmin(DefaultUserAdmin):
    pass


@admin.register(UserProgram)
class UserProgramAdmin(admin.ModelAdmin):
    fields = ('id', 'user', 'program', 'is_completed', 'start_ts', 'end_ts',)
    list_display = ('id', 'user', 'program', 'is_completed', 'start_ts', 'end_ts',)
    list_display_links = ('id',)
    list_select_related = ('user', 'program',)
    readonly_fields = ('id',)
    ordering = ('id',)


@admin.register(UserWorkout)
class UserWorkoutAdmin(admin.ModelAdmin):
    fields = ('id', 'user_program', 'workout', 'is_completed', 'start_ts', 'end_ts',)
    list_display = ('id', 'user_program', 'workout', 'is_completed', 'start_ts', 'end_ts',)
    list_display_links = ('id',)
    list_select_related = ('user_program__user', 'user_program__program', 'workout',)
    readonly_fields = ('id',)
    ordering = ('id',)


@admin.register(UserSet)
class UserSetAdmin(admin.ModelAdmin):
    fields = ('id', 'user_program', 'user_workout', 'exercise', 'reps', 'weight', 'include_bodyweight', 'warm_up',)
    list_display = ('id', 'user_program', 'user_workout', 'exercise', 'reps', 'weight', 'include_bodyweight', 'warm_up',)
    list_display_links = ('id',)
    list_select_related = ('user_program__user', 'user_program__program', 'user_workout__workout', 'exercise',)
    readonly_fields = ('id',)
    ordering = ('id',)
