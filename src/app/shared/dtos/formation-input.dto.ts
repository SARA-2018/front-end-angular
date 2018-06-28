import { ItineraryInputDto } from './itinerary-input.dto';
import { SessionInputDto } from './session-input.dto';

export interface FormationInputDto {

    itinerary?: ItineraryInputDto;
    session?: SessionInputDto;
}
