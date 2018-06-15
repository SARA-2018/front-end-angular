import { Solution } from '../../../shared/solution.model';
import { Exercise } from '../../../shared/exercise.model';
import {ExerciseMotor} from './exercise-motor.model';

export class FillExercise extends ExerciseMotor {


  private exercise: Exercise;
  private readonly solution: Solution[];
  private TAG_STATEMENT: Number = 4;
  private options = [];

  constructor(exercise: Exercise) {
    super();
    this.exercise = exercise;
    // this.solutions = exercise.getSolutions()[this.getRandom(0, this.exercise.getSolutions().length - 1 )];
    //   this.exerciseJson = JSON.parse(json);
    // this.exercise = this.fillStatement(this.exerciseJson.name);
     this.solution = this.pickSolution(exercise.getSolutions());
    // this.exercise.addArraySolution(this.solutions);
    console.log(this.handMessage());
    console.log(this.solution);
  }
  handMessage(): string[] {
    return ['En este ejercicio rellena espacios en blanco en orden', this.fillStatement(this.exercise.getFormulation())];
  }

  handResponse(studentSolutions: Solution[]): string[] {
    const response: string[] = [];
    if (this.verifyResponse(studentSolutions)) {
      response.push('¡Genial! ¡Has acertado el ejercicio!');
    } else {
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

  fillStatement(statement: string): string {
    const statementArray = statement.split(' ');
    for ( let i = 0; i < statementArray.length; i++) {
      if (statementArray[i].length >= this.TAG_STATEMENT) {
        this.options.push(i);
      }
    }
    const indexStatement = this.options[this.getRandom(0, this.options.length - 1)];
    statementArray[indexStatement] = '_______';
    statement = '';
    for (let i = 0; i < statementArray.length; i++) {
      statement += statementArray[i].concat(' ');
    }
   return statement;
  }

  pickSolution(jsonSolution): Solution[] {
    const solutionArray: Solution[] = [];
    for ( let i = 0; i < 6; i++) {
      const solutionChoose = jsonSolution[this.getRandom(0, jsonSolution.length - 1)];
      solutionArray.push(new Solution(solutionChoose.text, solutionChoose.isCorrect ));
    }
    return solutionArray;
  }

  getRandom(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }
}
