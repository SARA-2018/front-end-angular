import { Solution } from '../../../shared/solution.model';
import { Exercise } from '../../../shared/exercise.model';
import {ExerciseMotor} from './exercise-motor.model';

export class FillBlankMotor extends ExerciseMotor {


  public exercise: Exercise;

  private TAG_STATEMENT: Number = 4;
  private OPTIONS_EMPTY: Number = 2;
  private indexStatement: number[] = [];
  private solution: Solution;
  private statement = '';

  constructor(exercise: Exercise) {
    super();
    this.exercise = exercise;
  }
  handMessage(): string[] {
    const solutions: Solution[] = [];
    for ( let i = 0; i < this.exercise.getSolutions().length; i++) {
      if (this.exercise.getSolutions()[i].getIsCorrect()) {
        solutions.push(this.exercise.getSolutions()[i]);
      }
    }
    this.solution = solutions[this.getRandom(0, solutions.length - 1)];
    this.statement = this.fillStatement(this.solution.getText());
    return ['En este ejercicio rellena espacios en blanco en orden', this.statement];
  }

  handResponse(response: string): string[] {
    let keyWord: string[];
    const result: string[] = [];
    const solutions: Solution[] = [];
    const regExp = new RegExp('[\n, \t]+');
    keyWord = response.split(regExp);
    const solution = this.statement.split(' ');
    for ( let i = 0; i < this.indexStatement.length; i++) {
      solution[this.indexStatement.sort()[i]] = keyWord[i];
    }
    this.statement = '';
    for (let j = 0; j < solution.length; j++) {
      this.statement += solution[j].concat(' ');
    }
    solutions.push(new Solution(this.statement, undefined));
    if (this.verifyResponse(solutions)) {
      result.push('¡Genial! ¡Has acertado el ejercicio!');
    } else {
      this.exercise.addFail();
      result.push('Oh lo siento.. Pero no has acertado el ejercicio.');
    }
    return result;
  }

  verifyResponse(studentSolutions: Solution[]): boolean {
    return studentSolutions[0].getText().trim() === this.exercise.getSolutions()[0].getText().trim();
  }

  fillStatement(statement: string): string {
    const statementArray = statement.split(' ');
    const optionsArray = [];
    let random: number;
    for ( let i = 0; i < statementArray.length; i++) {
      if (statementArray[i].length >= this.TAG_STATEMENT) {
        optionsArray.push(i);
      }
    }
    while (this.indexStatement.length < this.OPTIONS_EMPTY) {
      random = optionsArray[this.getRandom(0, optionsArray.length - 1)];
      let exists = false;
      for (let i = 0; i < this.indexStatement.length; i++) {
        if (this.indexStatement[i] === random) {
          exists = true;
          break;
        }
      }
      if (!exists) {
        this.indexStatement[this.indexStatement.length] = random;
      }
    }
    for (let i = 0; i < this.indexStatement.length; i++) {
      statementArray[this.indexStatement[i]] = '_______';
    }
    statement = '';
    for (let i = 0; i < statementArray.length; i++) {
      statement += statementArray[i].concat(' ');
    }
    return statement;
  }

  getRandom(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }
}
