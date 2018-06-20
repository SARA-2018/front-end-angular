import { FormationDto } from './formation.dto';

export interface ItineraryDto {
    id: string;
    name: string;
    formations?: FormationDto[] ;
}
