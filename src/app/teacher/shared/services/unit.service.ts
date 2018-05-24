import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UnitDto } from '../dtos/unit.dto';
import { Unit } from '../models/unit.model';
import { RelationDto } from '../dtos/relation.dto';
import { Subject } from 'rxjs/Subject';
import { MatSnackBar } from '@angular/material';
import { HttpService } from '../../../core/http.service';
import { FilterDto } from '../dtos/filter.dto';

@Injectable()
export class UnitService {

  static END_POINT = '/unit';

  constructor(private httpService: HttpService, private snackBar: MatSnackBar) {
  }

  create(unit: Unit): Observable<any> {
    return this.httpService.post(UnitService.END_POINT, unit);
  }

  filter(name: string): Observable<FilterDto[]> {
    return this.httpService.param('name', `${name}`).get(UnitService.END_POINT + '/search').map(data => {
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
