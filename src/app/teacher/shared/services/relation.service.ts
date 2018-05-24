import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RelationDto } from '../dtos/relation.dto';
import { Subject } from 'rxjs/Subject';
import { MatSnackBar } from '@angular/material';
import { HttpService } from '../../../core/http.service';
import { AddRelationCommand } from '../models/commands/addRelationCommand.model';

@Injectable()
export class RelationService {

  static END_POINT = '/relation';

  constructor(private httpService: HttpService, private snackBar: MatSnackBar) {
  }

  create(relation: AddRelationCommand): Observable<any> {
    return this.httpService.successful().post(RelationService.END_POINT, relation);
  }

  getAll(): Observable<RelationDto[]> {
    return this.httpService.get(RelationService.END_POINT);
  }
}
