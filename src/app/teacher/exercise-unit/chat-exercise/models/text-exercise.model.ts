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
    console.log(jsonSolution[0]);
    return new Solution(jsonSolution.text, jsonSolution.isCorrect);
  }

}
