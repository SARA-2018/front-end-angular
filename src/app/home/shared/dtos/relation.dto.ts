import { UnitDto } from './unit.dto';

export interface RelationDto {
  _id?: number;
  name: string;
  topUnit: UnitDto;
  lowerUnit: UnitDto;
  type: string;
  semantics: string;
}
