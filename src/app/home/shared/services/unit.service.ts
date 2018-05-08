import { HttpService } from '../../../core/http.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UnitModel } from '../models/unit.model';
import { UnitEntity } from '../entity/unit.entity';

@Injectable()
export class UnitService {

  static END_POINT = '/unit';

  constructor(private httpService: HttpService) {
  }

  create(unit: UnitEntity): Observable<any> {
    return this.httpService.post(UnitService.END_POINT, unit.Name);
  }

  filter(name: string): Observable<any> {
    return this.httpService.get(UnitService.END_POINT + '/search/' + name).map(data => {
      return data;
      });
  }

  getAll(): Observable<UnitModel[]> {
    return this.httpService.get(UnitService.END_POINT);
  }

  delete(unit: UnitEntity): Observable<any> {
    return this.httpService.delete(UnitService.END_POINT + `/${unit.Id}`);
  }
}
