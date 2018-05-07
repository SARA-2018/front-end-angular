import { UnitModel } from './unit.model';

export interface RelationModel {
  _id?: number;
  name: string;
  topUnit: UnitModel;
  lowerUnit: UnitModel;
}
