import { Unit } from '../models/unit.model';

export class Relation {

  private id: number;
  private type: string;
  private semantics: string;
  private topUnit: Unit;
  private lowerUnit: Unit;

  constructor(topUnit: Unit, lowerUnit: Unit, type: string, semantics?: string) {
    this.topUnit = topUnit;
    this.lowerUnit = lowerUnit;
    this.type = type;
    this.semantics = semantics;
    this.topUnit.appendUnit(lowerUnit, type, semantics);
  }

  getTopUnit(): Unit {
    return this.topUnit;
  }

  getLowerUnit(): Unit {
    return this.lowerUnit;
  }
}
