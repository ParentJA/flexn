import React from 'react';

export default function ExerciseLabel({ exercise, set }) {
  if (exercise == null) return 'None';
  return (
    <span>
      {exercise.name}, {set.min_reps}-{set.max_reps} reps {'('}
      {set.training_type}
      {')'}
    </span>
  );
}
