import { UnitDto } from './unit.dto';

export interface RelationDto {
  name: string;
  topUnit: UnitDto;
  lowerUnit: UnitDto;
  type: string;
  semantics: string;
}
