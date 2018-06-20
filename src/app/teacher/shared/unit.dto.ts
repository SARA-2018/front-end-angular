import { ItineraryMiddle } from '../../shared/dtos/itinerary-middle.dto';

export interface UnitDto {
    name: string;
    code: number;
    content: string;
    itineraries?: ItineraryMiddle[];
}
