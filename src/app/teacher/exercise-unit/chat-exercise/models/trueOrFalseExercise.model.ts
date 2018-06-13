import { Solution } from '../../../shared/solution.model';
import { Exercise } from '../../../shared/exercise.model';

export class TrueOrFalseExercise {
    objJson;
    exercise: Exercise;
    solution: Solution;

    constructor(json: string) {
        this.objJson = JSON.parse(json);
        this.exercise = new Exercise(this.objJson.name);
        this.solution = this.pickSolution(this.objJson.solutions);
        this.exercise.addSolution(this.solution);
        // this.generateExercise(this.solutions);
    }
    pickSolution(jsonSolution): Solution {
        console.log(jsonSolution[this.getRandom(0, jsonSolution.length )]);
        const solutionChoose = jsonSolution[this.getRandom(0, jsonSolution.length)];
        return new Solution(solutionChoose.text, solutionChoose.isCorrect );
    }
    getRandom(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
    checkIsCorrect(response: string): boolean {
        if ( response === 'Verdadero' ) {
            if (this.solution.getIsCorrect) {
                return true;
            } else {
                return false;
            }
        } else if ( response === 'False') {
            if (!this.solution.getIsCorrect) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

}
