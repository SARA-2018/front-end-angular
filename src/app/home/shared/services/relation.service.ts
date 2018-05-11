import { HttpService } from '../../../core/http.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Relation} from '../entity/relation.entity';

@Injectable()
export class RelationService {

  static END_POINT = '/relation';

  constructor(private httpService: HttpService) {
  }

  create(relation: Relation): Observable<any> {
    return this.httpService.post(RelationService.END_POINT, relation);
  }
}
