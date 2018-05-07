import { Unit } from './unit.entity';

export class Relation {

  id: number;
  name: string;
  topUnit: Unit;
  lowerUnit: Unit;

  constructor(topUnit, lowerUnit, name?) {
    this.topUnit = topUnit;
    this.lowerUnit = lowerUnit;
    this.name = name;
    this.topUnit.appendChild(lowerUnit);
  }

}
