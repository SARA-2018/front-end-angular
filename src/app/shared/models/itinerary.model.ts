import { Formation } from './formation.model';

export class Itinerary extends Formation {
    private formations: Formation[];

    constructor(name: string) {
        super(name);
        this.formations = [];
    }
    setFormations(formations: Formation[]): Itinerary {
        this.formations = formations;
        return this;
    }

    getFormations(): Formation[] {
        return this.formations;
    }

    addFormation(formation: Formation) {
        this.formations.push(formation);
    }
}
