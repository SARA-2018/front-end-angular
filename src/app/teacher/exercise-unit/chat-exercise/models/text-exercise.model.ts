import { Solution } from '../../../shared/solution.model';
import { Exercise } from '../../../shared/exercise.model';

export class TextExercise {

  private exercise: Exercise;
  private exerciseJson;
  private solution: Solution;

  constructor(json: string) {
    this.exerciseJson = JSON.parse(json);
    this.exercise = new Exercise(this.exerciseJson.name);
    this.solution = this.pickSolution(this.exerciseJson.solutions);
    this.exercise.addSolution(this.solution);
  }

  pickSolution(jsonSolution): Solution {
    const solution = jsonSolution[0];
    return new Solution(solution.text, solution.isCorrect);
  }

  checkCorrect(response: string): boolean {
    let isCorrect = true;
    if ( response === this.solution.getText()) {
      isCorrect = true;
    } else {
      isCorrect = false;
    }
    return isCorrect;
  }
}
