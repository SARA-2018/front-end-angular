import { UnitInputDto } from '../../../shared/dtos/unit-input.dto';
import { RelationDto } from './relation.dto';

export interface FriendsDto {
    unit: UnitInputDto;
    topUnits: UnitInputDto[];
    lowerUnits: UnitInputDto[];
    relations: RelationDto[];
}
