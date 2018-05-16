import {MatSnackBar} from '@angular/material';
import {RelationService} from '../services/relation.service';

export class RelationOutput {

  private type: string;
  private semantics: string;
  private idTopUnit: number;
  private idLowerUnit: number;
  private cardinal: string;

  constructor(type: string, idTopUnit: number, idLowerUnit: number, semantics?: string, cardinal?: string) {
    this.idTopUnit = idTopUnit;
    this.idLowerUnit = idLowerUnit;
    this.type = type;
    this.semantics = semantics;
    this.cardinal = cardinal;
  }

  saveRelation(relationService: RelationService, snackBar: MatSnackBar) {
    relationService.create(this).subscribe(() => {
      snackBar.open('Creado Correctamente !', '', {
        duration: 2000
      });
    });
  }
}
