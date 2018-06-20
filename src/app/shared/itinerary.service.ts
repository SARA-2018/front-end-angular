import { Injectable } from '@angular/core';
import { HttpService } from '../core/http.service';
import { Itinerary } from '../teacher/info-unit/models/itinerary.model';
import { Observable } from 'rxjs/Observable';
import { FormationDto } from './dtos/formation.dto';

@Injectable()
export class ItineraryService {

  static END_POINT = '/itinerary';

  constructor(private httpService: HttpService) {
  }

  create(itinerary: Itinerary): Observable<any> {
    return this.httpService.successful().post(ItineraryService.END_POINT, itinerary);
  }

  getAll(): Observable<FormationDto[]> {
    return this.httpService.get(ItineraryService.END_POINT);
  }
}
