import { ItineraryMiddle } from './dtos/itinerary-middle.dto';

export interface UnitDto {
    name: string;
    code: number;
    content: string;
    itineraries?: ItineraryMiddle[];
}
