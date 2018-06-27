import { UnitDto } from '../../../shared/unit.dto';
import { RelationDto } from './relation.dto';

export interface FriendsDto {
    unit: UnitDto;
    topUnits: UnitDto[];
    lowerUnits: UnitDto[];
    relations: RelationDto[];
}
