import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CreateItineraryOutputDto } from '../../teacher/info-unit/dtos/create-itinerary-output.dto';
import { FormationInputDto } from '../dtos/formation-input.dto';
import { HttpService } from '../../core/http.service';
import { ItineraryInputDto } from '../dtos/itinerary-input.dto';


@Injectable()
export class ItineraryService {

  static END_POINT = '/itinerary';

  constructor(private httpService: HttpService) {
  }

  create(itinerary: CreateItineraryOutputDto): Observable<any> {
    return this.httpService.successful().post(ItineraryService.END_POINT, itinerary);
  }

  getAll(): Observable<FormationInputDto[]> {
    return this.httpService.get(ItineraryService.END_POINT);
  }

  getById(id: string): Observable<ItineraryInputDto> {
    return this.httpService.get(ItineraryService.END_POINT + '/' + id);
  }
}
