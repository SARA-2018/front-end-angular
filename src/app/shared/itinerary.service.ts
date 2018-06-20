import { Injectable } from '@angular/core';
import { HttpService } from '../core/http.service';
import { Itinerary } from '../teacher/info-unit/models/itinerary.model';
import { Observable } from 'rxjs/Observable';
import { FormationDto } from './dtos/formation.dto';
import { ItineraryDto } from './dtos/itinerary.dto';
import { CreateItineraryDto } from '../teacher/info-unit/dtos/create-itinerary.dto';

@Injectable()
export class ItineraryService {

  static END_POINT = '/itinerary';

  constructor(private httpService: HttpService) {
  }

  create(itinerary: CreateItineraryDto): Observable<any> {
    return this.httpService.successful().post(ItineraryService.END_POINT, itinerary);
  }

  getAll(): Observable<FormationDto[]> {
    return this.httpService.get(ItineraryService.END_POINT);
  }

  getById(id: string): Observable<ItineraryDto> {
    return this.httpService.get(ItineraryService.END_POINT + '/' + id);
  }
}
