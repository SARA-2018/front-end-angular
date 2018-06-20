import { ItineraryDto } from '../../shared/dtos/itinerary.dto';

export interface UnitDto {
    name: string;
    code: number;
    content: string;
    itineraries?: ItineraryDto[];
}
