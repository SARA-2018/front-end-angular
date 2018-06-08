import { Formation } from './formation.model';

export class Itinerary extends Formation {
    private _id: number;
    private name: string;
    private formations: Formation[];

    constructor() {
        super();
        this.formations = [];
    }

    setId(id: number): Itinerary {
        this._id = id;
        return this;
    }
    setName(name: string): Itinerary {
        this.name = name;
        return this;
    }
    setFormations(formations: Formation[]): Itinerary {
        this.formations = formations;
        return this;
    }
    getId(): number {
        return this._id;
    }
    getName(): string {
        return this.name;
    }
    getFormations(): Formation[] {
        return this.formations;
    }
}
