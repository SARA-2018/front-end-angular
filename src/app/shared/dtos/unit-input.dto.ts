import { ItineraryMiddleInputDto } from './itinerary-middle-input.dto';

export interface UnitInputDto {
    name: string;
    code: number;
    content: string;
    itineraries?: ItineraryMiddleInputDto[];
}
