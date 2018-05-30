import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RelationDto } from '../dtos/relation.dto';
import { HttpService } from '../../../core/http.service';
import { AddRelationCommand } from '../models/commands/add-relation-command.model';
import { DeleteRelationCommand } from '../models/commands/delete-relation-command.mode';

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

  delete(relation: DeleteRelationCommand): Observable<any> {
    return this.httpService.successful().delete(RelationService.END_POINT, relation);
  }
}
