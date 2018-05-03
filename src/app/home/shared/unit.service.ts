import { HttpService } from '../../core/http.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Units } from '../unit';
import { Unit } from '../unit.model';

@Injectable()
export class UnitService {

  static END_POINT = '/unit';

  constructor(private httpService: HttpService) {
  }

  create(body: Object): Observable<Units[]> {
    return this.httpService.post(UnitService.END_POINT, body).map(data => {
      return data;
    });
  }

  filter(id): Observable<any> {
    return this.httpService.get(UnitService.END_POINT + '/search/' + id).map(data => {
      return data;
      });
  }

  getAll(): Observable<Unit[]> {
    return this.httpService.get(UnitService.END_POINT);
  }
}
