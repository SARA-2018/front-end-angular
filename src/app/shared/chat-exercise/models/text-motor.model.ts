import { Solution } from '../../models/solution.model';
import { Exercise } from '../../models/exercise.model';
import { ExerciseMotor } from './exercise-motor.model';

export class TextMotor extends ExerciseMotor {

  constructor (exercise: Exercise) {
    super(exercise);
  }

  handMessage(): string[] {
    const messages: string[] = [];
    messages.push('Resuelve: ');
    messages.push(this.exercise.getFormulation());
    return messages;
  }

  handResponse(response: string): string[] {
    const messages: string[] = [];
    messages.push('De acuerdo! Ya corregiremos este ejercicio. ');
    this.overcome = true;
    return messages;
  }

  verifyResponse(studentSolution: Solution[]): boolean {
    return studentSolution[0].getText() === this.exercise.getFormulation();
  }

}
