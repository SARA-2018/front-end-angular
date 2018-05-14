import { HttpService } from '../../../core/http.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RelationOutput } from '../models/relation-output.model';
import { RelationDto } from '../dtos/relation.dto';

@Injectable()
export class RelationService {

  static END_POINT = '/relation';

  constructor(private httpService: HttpService) {
  }

  create(relation: RelationOutput): Observable<any> {
    return this.httpService.post(RelationService.END_POINT, relation);
  }

  getAll(): Observable<RelationDto[]> {
    return this.httpService.get(RelationService.END_POINT);
  }
}
