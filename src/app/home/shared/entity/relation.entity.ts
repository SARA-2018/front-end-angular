import { Unit } from './unit.entity';

export class Relation {

  id: number;
  name: string;
  topUnit: Unit;
  lowerUnit: Unit;
  type: string;

  constructor(topUnit, lowerUnit, type?, name?) {
    this.topUnit = topUnit;
    this.lowerUnit = lowerUnit;
    this.type = type;
    this.name = name;
    this.topUnit.appendChild(lowerUnit);
    this.topUnit.setRelation(type);
  }

}
