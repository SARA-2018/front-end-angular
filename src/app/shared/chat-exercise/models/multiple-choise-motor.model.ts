import { Solution } from '../../../teacher/shared/solution.model';
import { Exercise } from '../../../teacher/shared/exercise.model';
import { ExerciseMotor } from './exercise-motor.model';

export class MultipleChoiseMotor extends ExerciseMotor {

    constructor(exercise: Exercise) {
        super(exercise);
    }

    handMessage(): string[] {
        const messages: string[] = [];
        messages.push('Indica cuáles de las siguientes afirmaciones son correctas: ');
        for (let i = 0; i < this.exercise.getSolutions().length; i++) {
            messages.push(i + 1 + ' - ' + this.exercise.getSolutions()[i].getText());
        }
        return messages;
    }

    handResponse(response: string): string[] {
        const regExp = new RegExp('[a-zA-Z \n,]+');
        const results = response.split(regExp);
        const messages: string[] = [];
        if (this.validateResponse(results)) {
            const studentSolutions: Solution[] = [];
            for (let i = 0; i < this.exercise.getSolutions().length; i++) {
                studentSolutions.push(new Solution(this.exercise.getSolutions()[i].getText(), false));
            }
            for (const result of results) {
                studentSolutions[Number(result) - 1].setIsCorrect(true);
            }
            if (this.verifyResponse(studentSolutions)) {
                messages.push('¡Genial! ¡Has acertado el ejercicio!');
            } else {
                this.exercise.addFail();
                messages.push('Oh lo siento.. Pero no has acertado el ejercicio.');
            }
            this.overcome = true;
        } else {
            messages.push('Introduce los números de las respuestas correctas. Ejemplo: 1, 2, 3');
        }
        return messages;
    }

    validateResponse(results: string[]): boolean {
        for (const result of results) {
            if ((result === undefined) || (result === '')) {
                return false;
            }
        }
        return true;
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
