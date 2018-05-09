import { Unit } from './unit.entity';

export class Block {

    private type: string;
    private semantics: string;
    private units: Unit[] = [];

    constructor(type: string, unit: Unit) {
        this.type = type;
        this.units.push(unit);
    }

    log(block: Block, margin: string) {
        for (const unit of block.Units) {
            unit.log(margin);
        }
    }

    appendUnit(unit: Unit) {
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
