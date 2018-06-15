import { Solution } from '../../../shared/solution.model';
import { Exercise } from '../../../shared/exercise.model';

export class TrueOrFalseExercise {
    objJson;
    exercise: Exercise;
    solution: Solution;

    constructor(exercise: Exercise) {
        this.exercise = exercise;
        this.solution = exercise.getSolutions()[this.getRandom(0, this.exercise.getSolutions().length - 1 )];
    }
    getRandom(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    handMessage(): string[] {
        return ['Por favor, responde [V]erdadero o [F]also a la siguiente cuestión', this.solution.getText()];
    }
    handResponse(studentSolution: Solution[]): string[] {
        if (this.verifyResponse(studentSolution)) {
            return 'Muy bien maquina';
        } else {
            return 'Ufff, te has equivocado';
        }
    }
    verifyResponse(studentSolution: Solution[]): boolean {
        if (studentSolution[0].getIsCorrect() === this.solution.getIsCorrect()) {
            return true;
        } else {
            return false;
        }
    }

}
