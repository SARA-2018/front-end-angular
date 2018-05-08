import { UnitEntity } from './unit.entity';

export class RelationEntity {

  private id: number;
  private name: string;
  private topUnit: UnitEntity;
  private lowerUnit: UnitEntity;
  private type: string;

  constructor(topUnit: UnitEntity, lowerUnit: UnitEntity, type?: string, name?: string) {
    this.topUnit = topUnit;
    this.lowerUnit = lowerUnit;
    this.type = type;
    this.name = name;
    this.topUnit.appendChild(lowerUnit, type);
  }

}
