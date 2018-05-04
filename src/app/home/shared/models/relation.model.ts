import { UnitModel } from './unit.model';

export interface RelationModel {
  id?: number;
  name: string;
  topUnit: UnitModel;
  lowerUnit: UnitModel;
}
