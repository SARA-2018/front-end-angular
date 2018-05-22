import { HttpService } from '../../../core/http.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UnitDto } from '../dtos/unit.dto';
import { Unit } from '../models/unit.model';
import { RelationDto } from '../dtos/relation.dto';
import { Subject } from 'rxjs/Subject';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class UnitService {

  static END_POINT = '/unit';

  private allUnits: Subject<UnitDto[]> = new Subject();

  constructor(private httpService: HttpService, private snackBar: MatSnackBar) {
  }

  create(unit: Unit) {
    this.httpService.post(UnitService.END_POINT, unit).subscribe(
      () => {
        this.readAll();
        this.snackBar.open('Creado Correctamente !', '', {
          duration: 2000
        });
      },
      error => {
        this.snackBar.open('No ha podido crearse la unidad.', '', {
          duration: 8000
        });
      });
  }

  filter(name: string): Observable<RelationDto[]> {
    return this.httpService.param('name', `${name}`).get(UnitService.END_POINT + '/search').map(data => {
      return data;
    });
  }

  private readAll() {
    return this.httpService.get(UnitService.END_POINT).subscribe(
      unitsDto => {
        this.allUnits.next(unitsDto);
      });
  }

  getAll(): Observable<UnitDto[]> {
    this.readAll();
    return this.allUnits.asObservable();
  }

  delete(id: number) {
    this.httpService.delete(UnitService.END_POINT + `/${id}`).subscribe(
      () => {
        this.readAll();
        this.snackBar.open('Eliminado Correctamente !', '', {
          duration: 8000
        });
      },
      error => {
        this.snackBar.open('Recurso no encontrado !', '', {
          duration: 8000
        });
      });
  }
}
