import { Solution } from '../../../shared/solution.model';
import { Exercise } from '../../../shared/exercise.model';
import { ExerciseMotor } from './exercise-motor.model';

export class TextMotor extends ExerciseMotor {

  private exercise: Exercise;

  constructor (exercise: Exercise) {
    super();
    this.exercise = exercise;
  }

  handMessage(): string[] {
    const response: string[] = [];
    response.push(this.exercise.getFormulation());
    return response;
  }

  handResponse(studentSolutions: Solution[]): string[] {
    const response: string[] = [];
    response.push('De acuerdo! Ya corregiremos este ejercicio. ');
    return response;
  }

  verifyResponse(studentSolution: Solution[]): boolean {
    return studentSolution[0].getText() === this.exercise.getFormulation();
  }
}
