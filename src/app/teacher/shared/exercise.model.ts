import { Solution } from './solution.model';
import { Interaction } from '../info-unit/models/interaction.model';

export class Exercise extends Interaction {
    private _id: number;
    private formulation: string;
    private kind: string;
    private solutions: Solution[];

    constructor(formulation: string) {
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
    setId(id: number): Exercise {
        this._id = id;
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
    setKind(kind: string) {
        this.kind = kind;
        return this;
    }
    getId(): number {
        return this._id;
    }
    getFormulation(): string {
        return this.formulation;
    }
    getSolutions(): Solution[] {
        return this.solutions;
    }
}
