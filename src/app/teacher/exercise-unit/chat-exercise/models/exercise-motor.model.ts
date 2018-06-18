import { Solution } from '../../../shared/solution.model';
import { Exercise } from '../../../shared/exercise.model';

export abstract class ExerciseMotor {

    exercise: Exercise;
    overcome: boolean;

    abstract handMessage(): string[];

    abstract handResponse(response: string): string [];

    abstract verifyResponse(studentSolution: Solution[]): boolean;

    getExercise(): Exercise {
        return this.exercise;
    }

    getOvercome(): boolean {
        return this.overcome;
    }

}
