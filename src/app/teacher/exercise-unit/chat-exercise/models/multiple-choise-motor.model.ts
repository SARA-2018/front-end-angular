import { Solution } from '../../../shared/solution.model';
import { Exercise } from '../../../shared/exercise.model';

export class MultipleChoise {
    objJson;
    exercise: Exercise;
    solutions: Solution[];
    NUMBER_OF_SOLUTION = 5;
    constructor(json: string) {
        this.objJson = JSON.parse(json);
        this.exercise = new Exercise(this.objJson.name);
        this.solutions = this.pickSolution(this.objJson.solutions);
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
    checkIstrue(solutionIndex: number[]): boolean {
        let isCorrect = true;
        for ( let i = 0; i < solutionIndex.length; i++) {
            if (!this.solutions[solutionIndex[i]].getIsCorrect()) {
                isCorrect = false;
            }
        }
        return isCorrect;
    }

}
