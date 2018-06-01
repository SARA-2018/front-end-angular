import { Unit } from './unit.model';
import { Relation } from './relation.model';

export class Block {

    private ascendantUnit: Unit;
    private units: Unit[] = [];
    private relations: Relation[] = [];
    private type: string;
    private semantics: string;
    private cardinalTopUnit: string;
    private cardinalLowerUnit: string;

    constructor(relation: Relation, ascendantUnit: Unit) {
        this.type = relation.getType();
        this.semantics = relation.getSemantics();
        this.cardinalLowerUnit = relation.getCardinalLowerUnit();
        this.cardinalTopUnit = relation.getCardinalTopUnit();
        this.ascendantUnit = ascendantUnit;
        this.units.push(relation.getLowerUnit());
        relation.getLowerUnit().setAscendantBlock(this);
        this.relations.push(relation);
    }

    addRelation(relation: Relation) {
        this.relations.push(relation);
        this.units.push(relation.getLowerUnit());
        relation.getLowerUnit().setAscendantBlock(this);
    }

    getType() {
        return this.type;
    }

    getRelations() {
        return this.relations;
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

    log(block: Block, margin: string, unitsVisited: Unit[]) {
        for (const unit of block.getUnits()) {
            unit.log(margin, unitsVisited);
        }
    }
}
