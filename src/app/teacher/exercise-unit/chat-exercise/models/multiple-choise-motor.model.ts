import { Solution } from '../../../shared/solution.model';
import { Exercise } from '../../../shared/exercise.model';
import { ExerciseMotor } from './exercise-motor.model';

export class MultipleChoiseMotor extends ExerciseMotor {

    constructor(exercise: Exercise) {
        super();
        this.exercise = exercise;
        this.overcome = false;
    }

    handMessage(): string[] {
        const messages: string[] = [];
        messages.push('Indica cuáles de las siguientes afirmaciones son correctas: ');
        messages.push('Ejemplo de respuesta: 1,2,3');
        for (let i = 0; i < this.exercise.getSolutions().length; i++) {
            messages.push(i + 1 + ' - ' + this.exercise.getSolutions()[i].getText());
        }
        return messages;
    }

    handResponse(response: string): string[] {
        const results = response.split(',');
        const solutions: Solution[] = [];
        for (let i = 0; i < this.exercise.getSolutions().length; i++) {
            solutions.push(new Solution(this.exercise.getSolutions()[i].getText(), false));
        }
        for (const result of results) {
            solutions[Number(result) - 1].setIsCorrect(true);
        }
        const messages: string[] = [];
        if (this.verifyResponse(solutions)) {
            messages.push('¡Genial! ¡Has acertado el ejercicio!');
        } else {
            this.exercise.addFail();
            messages.push('Oh lo siento.. Pero no has acertado el ejercicio.');
        }
        this.overcome = true;
        return messages;
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
