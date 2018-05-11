import {Unit} from './unit.entity';
import {MatSnackBar} from '@angular/material';
import {RelationService} from '../services/relation.service';

export class Relation {

  private type: string;
  private semantics: string;
  private idTopUnit: Unit;
  private idLowerUnit: Unit;

  constructor(type: string, idTopUnit: Unit, idLowerUnit: Unit, semantics?: string) {
    this.idTopUnit = idTopUnit;
    this.idLowerUnit = idLowerUnit;
    this.type = type;
    this.semantics = semantics;
  }

  saveRelation(relationService: RelationService, snackBar: MatSnackBar) {
    relationService.create(this).subscribe(() => {
      snackBar.open('Creado Correctamente !', '', {
        duration: 2000
      });
    });
  }
}
