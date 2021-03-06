import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../../core/http.service';
import { Unit } from '../models/unit.model';
import { FilterDto } from '../../teacher/graph-unit/dtos/filter.dto';
import { UnitInputDto } from '../dtos/unit-input.dto';
import { FriendsDto } from '../../teacher/graph-unit/dtos/friends.dto';

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

  getAll(): Observable<UnitInputDto[]> {
    return this.httpService.get(UnitService.END_POINT);
  }

  getByCode(unit: Unit): Observable<UnitInputDto> {
    return this.httpService.get(UnitService.END_POINT + '/' + unit.getCode());
  }

  getUnitsNotRelated(): Observable<UnitInputDto[]> {
    return this.httpService.get(UnitService.END_POINT + '/notrelated');
  }

  delete(code: number): Observable<any> {
    return this.httpService.delete(UnitService.END_POINT + `/${code}`);
  }

  getFriendsByCode(code: number): Observable<FriendsDto> {
    return this.httpService.get(UnitService.END_POINT + `/friends/${code}`);
  }

}
