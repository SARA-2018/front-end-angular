import { Solution } from '../../../shared/solution.model';
import { Exercise } from '../../../shared/exercise.model';

export class FillExercise {

  private exercise: Exercise;
  private exerciseJson;
  private solutions: Solution[];
  NUMBER_OF_SOLUTION = 5;

  constructor(json: string) {
    this.exerciseJson = JSON.parse(json);
    this.exercise = new Exercise(this.exerciseJson.name);
    this.solutions = this.pickSolution(this.exerciseJson.solutions);
    this.exercise.addArraySolution(this.solutions);
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
