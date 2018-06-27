import { UnitDto } from '../../../shared/dtos/unit.dto';

export interface RelationDto {
  topUnit: UnitDto;
  lowerUnit: UnitDto;
  type: string;
  semantics: string;
  cardinalTopUnit: string;
  cardinalLowerUnit: string;
}
