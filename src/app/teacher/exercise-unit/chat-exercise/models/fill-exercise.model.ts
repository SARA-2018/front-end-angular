import { Solution } from '../../../shared/solution.model';
import { Exercise } from '../../../shared/exercise.model';

export class FillExercise {

  private exercise: Exercise;
  private exerciseJson;
  private readonly solutions: Solution[];
  private NUMBER_OF_SOLUTION: Number = 5;
  private TAG_STATEMENT: Number = 4;
  private options = [];

  constructor(json: string) {
    this.exerciseJson = JSON.parse(json);
    this.exercise = this.fillStatement(this.exerciseJson.name);
    this.solutions = this.pickSolution(this.exerciseJson.solutions);
    this.exercise.addArraySolution(this.solutions);
  }

  fillStatement(statement: string): Exercise {
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
   return new Exercise (statement);
  }

  pickSolution(jsonSolution): Solution[] {
    const solutionArray: Solution[] = [];
    for ( let i = 0; i < this.NUMBER_OF_SOLUTION; i++) {
      const solutionChoose = jsonSolution[this.getRandom(0, jsonSolution.length - 1)];
      solutionArray.push(new Solution(solutionChoose.text, solutionChoose.isCorrect ));
    }
    return solutionArray;
  }

  getRandom(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }
  checkCorrect(response: string[]): boolean {
    let isCorrect = true;
    for ( let i = 0; i < response.length; i++) {
      if (!this.solutions[response[i]].getText()) {
        isCorrect = false;
      }
    }
    return isCorrect;
  }
}
