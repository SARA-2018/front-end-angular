import { Unit } from '../../../shared/models/unit.model';

export class Relation {

  private topUnit: Unit;
  private lowerUnit: Unit;
  private type: string;
  private semantics: string;
  private cardinalTopUnit: string;
  private cardinalLowerUnit: string;

  constructor(topUnit: Unit, lowerUnit: Unit, type: string, semantics?: string, cardinalTopUnit?: string, cardinalLowerUnit?: string) {
    this.topUnit = topUnit;
    this.lowerUnit = lowerUnit;
    this.type = type;
    this.semantics = semantics;
    this.cardinalTopUnit = cardinalTopUnit;
    this.cardinalLowerUnit = cardinalLowerUnit;
    this.topUnit.addRelation(this);
  }

  getTopUnit(): Unit {
    return this.topUnit;
  }

  getLowerUnit(): Unit {
    return this.lowerUnit;
  }

  getType(): string {
    return this.type;
  }

  getSemantics(): string {
    return this.semantics;
  }

  getCardinalTopUnit(): string {
    return this.cardinalTopUnit;
  }

  getCardinalLowerUnit(): string {
    return this.cardinalLowerUnit;
  }
}
