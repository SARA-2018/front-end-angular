import { HttpService } from '../../core/http.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Units} from '../unit';

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

}
