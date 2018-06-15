import { Solution } from '../../../shared/solution.model';

export abstract class ExerciseMotor {

    abstract handMessage(): string[];

    abstract handResponse(studentSolutions: Solution[]): string [];

    abstract verifyResponse(studentSolution: Solution[]): boolean;

    abstract getOvercome(): boolean;
}
