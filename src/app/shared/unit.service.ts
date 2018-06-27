import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UnitDto } from './unit.dto';
import { HttpService } from '../core/http.service';
import { FilterDto } from '../teacher/graph-unit/dtos/filter.dto';
import { FriendsDto } from '../teacher/graph-unit/dtos/friends.dto';
import { Unit } from '../teacher/graph-unit/models/unit.model';

@Injectable()
export class UnitService {

  static END_POINT = '/unit';

  constructor(private httpService: HttpService) {
  }

  create(unit: Unit): Observable<any> {
    return this.httpService.successful().post(UnitService.END_POINT, unit);
  }

  setContent(unit: Unit): Observable<any> {
    return this.httpService.successful().put(UnitService.END_POINT + '/' + unit.getCode() ,
     { name: unit.getName(), content: unit.getContent() });
  }

  filter(name: string): Observable<FilterDto[]> {
    return this.httpService.param('name', `${name}`).get(UnitService.END_POINT + '/search').map(data => {
      return data;
    });
  }

  getAll(): Observable<UnitDto[]> {
    return this.httpService.get(UnitService.END_POINT);
  }

  getByCode(unit: Unit): Observable<UnitDto> {
    return this.httpService.get(UnitService.END_POINT + '/' + unit.getCode());
  }

  getUnitsNotRelated(): Observable<UnitDto[]> {
    return this.httpService.get(UnitService.END_POINT + '/notrelated');
  }

  delete(code: number): Observable<any> {
    return this.httpService.delete(UnitService.END_POINT + `/${code}`);
  }

  getFriendsByCode(code: number): Observable<FriendsDto> {
    return this.httpService.get(UnitService.END_POINT + `/friends/${code}`);
  }

}
