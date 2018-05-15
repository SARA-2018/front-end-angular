import { Unit } from './unit.model';

export class Block {

    private type: string;
    private semantics: string;
    private units: Unit[] = [];

    constructor(unit: Unit, type: string, semantics?: string) {
        this.type = type;
        this.semantics = semantics;
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

    log(block: Block, margin: string) {
        for (const unit of block.getUnits()) {
            unit.log(margin);
        }
    }
}
