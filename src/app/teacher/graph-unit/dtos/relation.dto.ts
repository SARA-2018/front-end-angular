import { UnitDto } from '../../../shared/unit.dto';

export interface RelationDto {
  topUnit: UnitDto;
  lowerUnit: UnitDto;
  type: string;
  semantics: string;
  cardinalTopUnit: string;
  cardinalLowerUnit: string;
}
