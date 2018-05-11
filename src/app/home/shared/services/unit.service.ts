import { HttpService } from '../../../core/http.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UnitDto } from '../dtos/unit.dto';
import { Unit } from '../models/unit.model';

@Injectable()
export class UnitService {

  static END_POINT = '/unit';

  constructor(private httpService: HttpService) {
  }

  create(unit: Unit): Observable<any> {
    return this.httpService.post(UnitService.END_POINT, unit);
  }

  filter(name: string): Observable<any> {
    return this.httpService.get(UnitService.END_POINT + '/search' + `/${name}`).map(data => {
      return data;
      });
  }

  getAll(): Observable<UnitDto[]> {
    return this.httpService.get(UnitService.END_POINT);
  }

  delete(id: number): Observable<any> {
    return this.httpService.delete(UnitService.END_POINT + `/${id}`);
  }
}
