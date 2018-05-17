import { HttpService } from '../../../core/http.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UnitDto } from '../dtos/unit.dto';
import { Unit } from '../models/unit.model';
import {RelationDto} from '../dtos/relation.dto';

@Injectable()
export class UnitService {

  static END_POINT = '/unit';

  constructor(private httpService: HttpService) {
  }

  create(unit: Unit): Observable<Unit[]> {
    return this.httpService.post(UnitService.END_POINT, unit);
  }

  filter(name: string): Observable<RelationDto[]> {
    return this.httpService.get(UnitService.END_POINT + '/search' + `/${name}`).map(data => {
      return data;
      });
  }

  getAll(): Observable<UnitDto[]> {
    return this.httpService.get(UnitService.END_POINT);
  }

  delete(id: number): Observable<Unit[]> {
    return this.httpService.delete(UnitService.END_POINT + `/${id}`);
  }
}
