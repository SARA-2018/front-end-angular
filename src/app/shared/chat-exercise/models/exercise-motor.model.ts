import { Solution } from '../../../teacher/shared/solution.model';
import { Exercise } from '../../../teacher/shared/exercise.model';

export abstract class ExerciseMotor {

    exercise: Exercise;
    overcome: boolean;

    constructor(exercise: Exercise) {
        this.exercise = exercise;
        this.overcome = false;
    }

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
