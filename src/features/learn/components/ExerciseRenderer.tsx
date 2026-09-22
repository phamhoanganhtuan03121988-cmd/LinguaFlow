import type { Exercise } from '@/src/content/types';
import { MultipleChoiceExercise } from './MultipleChoiceExercise';
import { FillBlankExercise } from './FillBlankExercise';
import { WordOrderExercise } from './WordOrderExercise';

interface Props {
  exercise: Exercise;
  onAnswered: (correct: boolean) => void;
}

export function ExerciseRenderer({ exercise, onAnswered }: Props) {
  switch (exercise.type) {
    case 'multiple-choice':
      return <MultipleChoiceExercise exercise={exercise} onAnswered={onAnswered} />;
    case 'fill-blank':
      return <FillBlankExercise exercise={exercise} onAnswered={onAnswered} />;
    case 'word-order':
      return <WordOrderExercise exercise={exercise} onAnswered={onAnswered} />;
    default: {
      const _exhaustiveCheck: never = exercise;
      return _exhaustiveCheck;
    }
  }
}
