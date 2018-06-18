import { Solution } from '../../../shared/solution.model';
import { Exercise } from '../../../shared/exercise.model';
import { ExerciseMotor } from './exercise-motor.model';

export class FillBlankMotor extends ExerciseMotor {


  public exercise: Exercise;
  private overcome: boolean;

  private TAG_STATEMENT: Number = 4;
  private OPTIONS_EMPTY: Number = 2;
  private indexStatement: number[] = [];

  constructor(exercise: Exercise) {
    super();
    this.exercise = exercise;
    console.log(this.handMessage());
  }
  handMessage(): string[] {
    const solutions = [];
    for (let i = 0; i < this.exercise.getSolutions().length; i++) {
      if (this.exercise.getSolutions()[i].getIsCorrect()) {
        solutions.push(this.exercise.getSolutions()[i].getText());
      }
    }
    const statement = solutions[this.getRandom(0, solutions.length - 1)];
    return ['En este ejercicio rellena espacios en blanco en orden', this.fillStatement(statement)];
  }

  handResponse(studentSolutions: Solution[]): string[] {
    let response: any;
    let text: any = '';
    const regExp = new RegExp('[\n, \t]+');
    for (let i = 0; i < studentSolutions.length; i++) {
      const keyWord = studentSolutions[i].getKeyWord().split(regExp);
      response = studentSolutions[i].getText().split(' ');
      for (let k = 0; k < this.indexStatement.length; k++) {
        response[this.indexStatement.sort()[k]] = keyWord[k];
      }
      for (let j = 0; j < response.length; j++) {
        text += response[j].concat(' ');
      }
      studentSolutions[i].setText(text);
    }
    if (this.verifyResponse(studentSolutions)) {
      response.push('¡Genial! ¡Has acertado el ejercicio!');
    } else {
      this.exercise.addFail();
      response.push('Oh lo siento.. Pero no has acertado el ejercicio.');
    }
    console.log(response);
    return response;
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
    while (this.indexStatement.length !== this.OPTIONS_EMPTY) {
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

  getOvercome(): boolean {
    return this.overcome;
  }
}
