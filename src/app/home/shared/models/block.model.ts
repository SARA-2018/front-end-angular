import { Unit } from './unit.model';

export class Block {

    private type: string;
    private semantics: string;
    private units: Unit[] = [];

    constructor(type: string, unit: Unit) {
        this.type = type;
        this.units.push(unit);
    }

    log(block: Block, margin: string) {
        for (const unit of block.getUnits()) {
            unit.log(margin);
        }
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
}
