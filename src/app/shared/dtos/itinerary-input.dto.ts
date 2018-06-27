import { FormationInputDto } from './formation-input.dto';

export interface ItineraryInputDto {
    id: string;
    name: string;
    formations?: FormationInputDto[] ;
}
