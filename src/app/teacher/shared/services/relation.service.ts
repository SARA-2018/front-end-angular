import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RelationDto } from '../dtos/relation.dto';
import { HttpService } from '../../../core/http.service';
import { AddRelationCommand } from '../models/commands/addRelationCommand.model';

@Injectable()
export class RelationService {

  static END_POINT = '/relation';

  constructor(private httpService: HttpService) {
  }

  create(relation: AddRelationCommand): Observable<any> {
    return this.httpService.successful().post(RelationService.END_POINT, relation);
  }

  getAll(): Observable<RelationDto[]> {
    return this.httpService.get(RelationService.END_POINT);
  }
}
