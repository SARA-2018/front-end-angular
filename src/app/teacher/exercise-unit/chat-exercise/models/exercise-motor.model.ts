import { Solution } from '../../../shared/solution.model';
import { Exercise } from '../../../shared/exercise.model';

export abstract class ExerciseMotor {

    exercise: Exercise;

    abstract handMessage(): string[];

    abstract handResponse(studentSolutions: Solution[]): string [];

    abstract verifyResponse(studentSolution: Solution[]): boolean;

    getExercise(): Exercise {
        return this.exercise;
    }

}
