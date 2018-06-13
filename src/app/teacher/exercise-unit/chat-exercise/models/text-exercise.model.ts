import { Solution } from '../../../shared/solution.model';

export class TextExercise {

  private response: string;
  private exercise: string;
  private exerciseJson;
  private solution: Solution;

  constructor(exercise: string) {
    this.exerciseJson = JSON.parse(exercise);
    this.response = this.exerciseJson.response;
    this.exercise = this.exerciseJson.exercise;
  }





}
