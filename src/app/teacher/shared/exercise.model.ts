import { Solution } from './solution.model';
import { Interaction } from '../info-unit/models/interaction.model';
import { Itinerary } from '../../shared/itinerary.model';

export class Exercise extends Interaction {
    private formulation: string;
    private counterFail = 0;
    private solutions: Solution[];

    constructor(formulation?: string) {
        super();
        this.formulation = formulation;
        this.solutions = [];
    }
    addSolution(solution: Solution) {
        this.solutions.push(solution);
        return this;
    }
    addArraySolution(solutions: Solution[]) {
        this.solutions.concat(solutions);
        return this;
    }
    setFormulation(formulation: string): Exercise {
        this.formulation = formulation;
        return this;
    }
    setSolutions(solutions: Solution[]): Exercise {
        this.solutions = solutions;
        return this;
    }
    getFormulation(): string {
        return this.formulation;
    }
    getSolutions(): Solution[] {
        return this.solutions;
    }

    getCounterFail(): number {
        return this.counterFail;
    }

    addFail() {
        this.counterFail = this.counterFail + 1;
        return this.counterFail;
    }

    getText(): string {
        return 'Ejercicio';
    }

    isExercise(): boolean {
        return true;
    }
}
