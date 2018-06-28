import { UnitInputDto } from '../../../shared/dtos/unit-input.dto';

export interface RelationDto {
  topUnit: UnitInputDto;
  lowerUnit: UnitInputDto;
  type: string;
  semantics: string;
  cardinalTopUnit: string;
  cardinalLowerUnit: string;
}
