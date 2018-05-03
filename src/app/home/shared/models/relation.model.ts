import {Unit} from './unit.model';

export interface RelationUnit {
  id?: number;
  name: string;
  topUnit: Unit;
}
