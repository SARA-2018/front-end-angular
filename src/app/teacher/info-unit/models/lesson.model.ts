import { Interaction } from './interaction.model';

export class Lesson {
    private _id: string;
    private name: string;
    private interactions: Interaction[];

    constructor(name: string) {
        this.name = name;
        this.interactions = [];
    }

    setId(id: string) {
        this._id = id;
    }
    setName(name: string) {
        this.name = name;
    }
    setInteractions(interactions: Interaction[]) {
        this.interactions = interactions;
    }
    getId(): string {
        return this._id;
    }
    getName(): string {
        return this.name;
    }
    getInteractions(): Interaction[] {
        return this.interactions;
    }

    addInteractions(interaction: Interaction) {
      this.interactions.push(interaction);
    }
}
