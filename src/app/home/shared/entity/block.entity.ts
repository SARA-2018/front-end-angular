import { UnitEntity } from './unit.entity';

export class BlockEntity {

    type: string;
    semantics: string;
    units: UnitEntity[] = [];

    constructor(type: string, unit: UnitEntity) {
        this.type = type;
        this.units.push(unit);
    }

    appendUnit(unit: UnitEntity) {
        this.units.push(unit);
    }

    getType() {
        return this.type;
    }

    get Units() {
        return this.units;
    }
}
