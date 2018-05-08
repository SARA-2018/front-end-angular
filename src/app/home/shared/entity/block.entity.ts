import { UnitEntity } from './unit.entity';

export class BlockEntity {

    private type: string;
    private semantics: string;
    private units: UnitEntity[] = [];

    constructor(type: string, unit: UnitEntity) {
        this.type = type;
        this.units.push(unit);
    }

    appendUnit(unit: UnitEntity) {
        this.units.push(unit);
    }

    get Type() {
        return this.type;
    }

    get Units() {
        return this.units;
    }

    get Semantics() {
        return this.semantics;
    }
}
