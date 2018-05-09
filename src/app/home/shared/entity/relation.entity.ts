import { Unit } from './unit.entity';

export class Relation {

  private id: number;
  private name: string;
  private topUnit: Unit;
  private lowerUnit: Unit;
  private type: string;

  constructor(topUnit: Unit, lowerUnit: Unit, type?: string, name?: string) {
    this.topUnit = topUnit;
    this.lowerUnit = lowerUnit;
    this.type = type;
    this.name = name;
    this.topUnit.appendUnit(lowerUnit, type);
  }

}
