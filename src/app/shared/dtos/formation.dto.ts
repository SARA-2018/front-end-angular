import { ItineraryDto } from './itinerary.dto';
import { SessionDto } from './session.dto';

export interface FormationDto {

    itinerary?: ItineraryDto;
    session?: SessionDto;
}
