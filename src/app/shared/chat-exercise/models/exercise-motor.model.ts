import { Exercise } from '../../models/exercise.model';
import { Solution } from '../../models/solution.model';

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
