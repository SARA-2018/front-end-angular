import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RelationOutput } from '../models/relation-output.model';
import { RelationDto } from '../dtos/relation.dto';
import { Subject } from 'rxjs/Subject';
import { MatSnackBar } from '@angular/material';
import { HttpService } from '../../../core/http.service';

@Injectable()
export class RelationService {

  static END_POINT = '/relation';

  private allRelations: Subject<RelationDto[]> = new Subject();

  constructor(private httpService: HttpService, private snackBar: MatSnackBar) {
  }

  create(relation: RelationOutput) {
    this.httpService.post(RelationService.END_POINT, relation).subscribe(
      () => {
        this.readAll();
        this.snackBar.open('Creado Correctamente !', '', {
          duration: 2000
        });
      }, error => {
        this.snackBar.open('No ha podido crearse la unidad.', '', {
          duration: 8000
        });
      });
  }

  getAll(): Observable<RelationDto[]> {
    this.readAll();
    return this.allRelations.asObservable();
  }

  private readAll() {
    return this.httpService.get(RelationService.END_POINT).subscribe(
      relationsDto => {
        this.allRelations.next(relationsDto);
      });
  }
}
