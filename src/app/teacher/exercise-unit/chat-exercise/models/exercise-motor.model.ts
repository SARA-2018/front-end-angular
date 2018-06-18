import { Solution } from '../../../shared/solution.model';
import { Exercise } from '../../../shared/exercise.model';

export abstract class ExerciseMotor {

    exercise: Exercise;

    abstract handMessage(): string[];

    abstract handResponse(text: string): string [];

    abstract verifyResponse(studentSolution: Solution[]): boolean;

    abstract getOvercome(): boolean;

    getExercise(): Exercise {
        return this.exercise;
    }

}
