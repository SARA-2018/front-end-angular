import { Solution } from '../../models/solution.model';
import { Exercise } from '../../models/exercise.model';
import { ExerciseMotor } from './exercise-motor.model';

export class DicotomicMotor extends ExerciseMotor {

    solution: Solution;
    solutionId: number;

    constructor(exercise: Exercise) {
        super(exercise);
        this.solution = exercise.getSolutions()[this.getRandom(0, this.exercise.getSolutions().length - 1)];
    }

    private getRandom(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    handMessage(): string[] {
        return ['Por favor, responde [V]erdadero o [F]also a la siguiente cuestión', this.solution.getText()];
    }

    handResponse(response: string): string[] {
        this.overcome = true;
        const studentSolution: Solution[] = [];
        if ((response === 'F') || (response === 'f')) {
            studentSolution.push(new Solution(this.solution.getText(), false));
        } else if ((response === 'V') || (response === 'v')) {
            studentSolution.push(new Solution(this.solution.getText(), true));
        } else {
            this.overcome = false;
            return ['Por favor, escribe V en caso de considerarla Verdadera o F en caso de Falsa: ', this.solution.getText()];
        }
        if (this.verifyResponse(studentSolution)) {
            return ['¡Muy bien máquina!', 'Sigue así'];
        } else {
            this.exercise.addFail();
            return ['Ufff, te has equivocado', 'Pero no te desanimes, sigue intentándolo'];
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
