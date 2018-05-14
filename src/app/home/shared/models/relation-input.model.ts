import { Unit } from '../models/unit.model';

export class RelationInput {

  private id: number;
  private type: string;
  private semantics: string;
  private topUnit: Unit;
  private lowerUnit: Unit;

  constructor(topUnit: Unit, lowerUnit: Unit, type?: string, semantics?: string) {
    this.topUnit = topUnit;
    this.lowerUnit = lowerUnit;
    this.type = type;
    this.semantics = semantics;
    this.topUnit.appendUnit(lowerUnit, type, semantics);
  }
}
