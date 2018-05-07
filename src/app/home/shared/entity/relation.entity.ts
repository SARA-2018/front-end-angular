import { UnitEntity } from './unit.entity';

export class RelationEntity {

  id: number;
  name: string;
  topUnit: UnitEntity;
  lowerUnit: UnitEntity;
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
