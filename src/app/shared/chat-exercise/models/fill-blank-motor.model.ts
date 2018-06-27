import { Solution } from '../../models/solution.model';
import { Exercise } from '../../models/exercise.model';
import { ExerciseMotor } from './exercise-motor.model';

export class FillBlankMotor extends ExerciseMotor {

  private TAG_STATEMENT = 4;
  private OPTIONS_EMPTY = 2;
  private indexStatement: number[] = [];
  private solution: Solution;
  private statement = '';

  constructor(exercise: Exercise) {
    super(exercise);
  }

  handMessage(): string[] {
    const solutions: Solution[] = [];
    for (let i = 0; i < this.exercise.getSolutions().length; i++) {
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
    const studentSolutions: Solution[] = [];
    const regExp = new RegExp('[\n,_\\- \t]+');
    keyWord = response.split(regExp);
    if (keyWord.length < this.indexStatement.length) {
      result.push('Te faltan espacios por rellenar, complétalos!');
    } else {
      const solution = this.statement.split(' ');
      for (let i = 0; i < this.indexStatement.length; i++) {
        solution[this.indexStatement.sort()[i]] = keyWord[i];
      }
      this.statement = '';
      for (let j = 0; j < solution.length; j++) {
        this.statement += solution[j].concat(' ');
      }
      studentSolutions.push(new Solution(this.statement, undefined));
      if (this.verifyResponse(studentSolutions)) {
        result.push('¡Genial! ¡Has acertado el ejercicio!');
      } else {
        this.exercise.addFail();
        result.push('Oh lo siento.. Pero no has acertado el ejercicio.');
      }
      this.overcome = true;
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
    for (let i = 0; i < statementArray.length; i++) {
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
