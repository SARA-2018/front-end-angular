import { Solution } from '../../../shared/solution.model';
import { Exercise } from '../../../shared/exercise.model';
import { ExerciseMotor } from './exercise-motor.model';

export class MultipleChoiseMotor extends ExerciseMotor {

    constructor(exercise: Exercise) {
        super();
        this.exercise = exercise;
    }

    handMessage(): string[] {
        const response: string[] = [];
        response.push('Indica cuál de las siguientes afirmaciones es cierta: ');
        for (let i = 0; i < this.exercise.getSolutions().length; i++) {
            response.push(i + 1 + ' - ' + this.exercise.getSolutions()[i].getText());
        }
        return response;
    }

    handResponse(studentSolutions: Solution[]): string[] {
        const response: string[] = [];
        if (this.verifyResponse(studentSolutions)) {
            response.push('¡Genial! ¡Has acertado el ejercicio!');
        } else {
            this.exercise.addFail();
            response.push('Oh lo siento.. Pero no has acertado el ejercicio.');
        }
        return response;
    }

    verifyResponse(studentSolutions: Solution[]): boolean {
        for (let i = 0; i < studentSolutions.length; i++) {
            if (studentSolutions[i].getIsCorrect() !== this.exercise.getSolutions()[i].getIsCorrect()) {
                return false;
            }
        }
        return true;
    }
}
