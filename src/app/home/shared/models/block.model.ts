import { Unit } from './unit.model';

export class Block {

    private type: string;
    private semantics: string;
    private cardinalTopUnit: string;
    private cardinalLowerUnit: string;
    private units: Unit[] = [];

    constructor(unit: Unit, type: string, semantics: string, cardinalTopUnit: string , cardinalLowerUnit: string) {
        this.type = type;
        this.semantics = semantics;
        this.cardinalLowerUnit = cardinalLowerUnit;
        this.cardinalTopUnit = cardinalTopUnit;
        this.units.push(unit);
    }

    appendUnit(unit: Unit) {
        this.units.push(unit);
    }

    getType() {
        return this.type;
    }

    getUnits() {
        return this.units;
    }

    getSemantics() {
        return this.semantics;
    }

    getCardinalTopUnit() {
        return this.cardinalTopUnit;
    }

    getCardinalLowerUnit() {
        return this.cardinalLowerUnit;
    }

    log(block: Block, margin: string) {
        for (const unit of block.getUnits()) {
            unit.log(margin);
        }
    }
}
