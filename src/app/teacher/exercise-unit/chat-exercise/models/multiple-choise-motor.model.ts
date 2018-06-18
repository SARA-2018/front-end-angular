import { Solution } from '../../../shared/solution.model';
import { Exercise } from '../../../shared/exercise.model';
import { ExerciseMotor } from './exercise-motor.model';

export class MultipleChoiseMotor extends ExerciseMotor {

    private overcome: boolean;

    constructor(exercise: Exercise) {
        super();
        this.exercise = exercise;
        this.overcome = false;
    }

    handMessage(): string[] {
        const response: string[] = [];
        response.push('Indica cuáles de las siguientes afirmaciones son correctas: ');
        response.push('Ejemplo de respuesta: 1,2,3');
        for (let i = 0; i < this.exercise.getSolutions().length; i++) {
            response.push(i + 1 + ' - ' + this.exercise.getSolutions()[i].getText());
        }
        console.log('hand Message');
        return response;
    }

    handResponse(studentSolutions: Solution[]): string[] {
        const results = studentSolutions[0].getText().split(',');
        const solutions: Solution[] = [];
        for (let i = 0; i < this.exercise.getSolutions().length; i++) {
            solutions.push(new Solution(this.exercise.getSolutions()[i].getText(), false));
        }
        for (const result of results) {
            solutions[Number(result) - 1].setIsCorrect(true);
        }
        const response: string[] = [];
        if (this.verifyResponse(solutions)) {
            response.push('¡Genial! ¡Has acertado el ejercicio!');
        } else {
            this.exercise.addFail();
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
