import { HttpService } from '../../../core/http.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UnitModel } from '../models/unit.model';

@Injectable()
export class UnitService {

  static END_POINT = '/unit';

  constructor(private httpService: HttpService) {
  }

  create(unit: UnitModel): Observable<any> {
    return this.httpService.post(UnitService.END_POINT, unit);
  }

  filter(id): Observable<any> {
    return this.httpService.get(UnitService.END_POINT + '/search/' + id).map(data => {
      return data;
      });
  }

  getAll(): Observable<UnitModel[]> {
    return this.httpService.get(UnitService.END_POINT);
  }

  delete(id): Observable<any> {
    return this.httpService.delete(UnitService.END_POINT + `/${id}`);
  }
}
