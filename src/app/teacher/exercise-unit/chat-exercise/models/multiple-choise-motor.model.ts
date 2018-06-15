import { Solution } from '../../../shared/solution.model';
import { Exercise } from '../../../shared/exercise.model';
import { ExerciseMotor } from './exercise-motor.model';

export class MultipleChoiseMotor extends ExerciseMotor {

    exercise: Exercise;
    overcome: boolean;

    constructor(exercise: Exercise) {
        super();
        this.exercise = exercise;
        this.overcome = false;
    }

    handMessage(): string[] {
        const response: string[] = [];
        response.push('Indica cuáles de las siguientes afirmaciones son correctas: ');
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
            response.push('Oh lo siento.. Pero no has acertado el ejercicio.');
        }
        this.overcome = true;
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

    getOvercome(): boolean {
        return this.overcome;
    }
}
