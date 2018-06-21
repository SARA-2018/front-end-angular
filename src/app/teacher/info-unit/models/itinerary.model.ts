import { Formation } from './formation.model';

export class Itinerary extends Formation {
    private name: string;
    private formations: Formation[];

    constructor(name?: string) {
        super();
        this.name = name;
        this.formations = [];
    }
    setName(name: string): Itinerary {
        this.name = name;
        return this;
    }
    setFormations(formations: Formation[]): Itinerary {
        this.formations = formations;
        return this;
    }
    getName(): string {
        return this.name;
    }
    getFormations(): Formation[] {
        return this.formations;
    }

    addFormation(formation: Formation) {
        this.formations.push(formation);
    }
}
