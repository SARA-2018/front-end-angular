import {MatSnackBar} from '@angular/material';
import {RelationService} from '../services/relation.service';

export class RelationOutput {

  private type: string;
  private semantics: string;
  private idTopUnit: number;
  private idLowerUnit: number;
  private cardinalTopUnit: string;
  private cardinalLowerUnit: string;

  constructor(type: string, idTopUnit: number, idLowerUnit: number, semantics?: string, cardinalTopUnit?: string, cardinalLowerUnit?: string) {
    this.idTopUnit = idTopUnit;
    this.idLowerUnit = idLowerUnit;
    this.type = type;
    this.semantics = semantics;
    this.cardinalTopUnit = cardinalTopUnit;
    this.cardinalLowerUnit = cardinalLowerUnit;
  }

  saveRelation(relationService: RelationService, snackBar: MatSnackBar) {
    relationService.create(this).subscribe(() => {
      snackBar.open('Creado Correctamente !', '', {
        duration: 2000
      });
    });
  }
}
