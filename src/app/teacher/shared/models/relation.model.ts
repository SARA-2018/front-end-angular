import { Unit } from './unit.model';


export class Relation {

  private id: number;
  private type: string;
  private semantics: string;
  private topUnit: Unit;
  private lowerUnit: Unit;
  private cardinalTopUnit: string;
  private cardinalLowerUnit: string;

  constructor(topUnit: Unit, lowerUnit: Unit, type: string, semantics?: string, cardinalTopUnit?: string, cardinalLowerUnit?: string) {
    this.topUnit = topUnit;
    this.lowerUnit = lowerUnit;
    this.type = type;
    this.semantics = semantics;
    this.cardinalTopUnit = cardinalTopUnit;
    this.cardinalLowerUnit = cardinalLowerUnit;
    this.topUnit.appendUnit(lowerUnit, type, semantics, cardinalTopUnit, cardinalLowerUnit);
  }

  getTopUnit(): Unit {
    return this.topUnit;
  }

  getLowerUnit(): Unit {
    return this.lowerUnit;
  }
}
