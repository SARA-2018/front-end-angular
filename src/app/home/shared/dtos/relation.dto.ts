import { UnitDto } from './unit.dto';

export interface RelationDto {
  code?: number;
  name: string;
  topUnit: UnitDto;
  lowerUnit: UnitDto;
  type: string;
  semantics: string;
}
