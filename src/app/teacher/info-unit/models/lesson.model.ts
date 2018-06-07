import { Interaction } from './interaction.model';

export class Lesson {
    private _id: number;
    private name: string;
    private interactions: Interaction[];

    constructor(name: string) {
        this.name = name;
        this.interactions = [];
    }

    setId(id: number) {
        this._id = id;
    }
    setName(name: string) {
        this.name = name;
    }
    setInteractions(interactions: Interaction[]) {
        this.interactions = interactions;
    }
    getId(): number {
        return this._id;
    }
    getName(): string {
        return this.name;
    }
    getInteractions(): Interaction[] {
        return this.interactions;
    }
}
