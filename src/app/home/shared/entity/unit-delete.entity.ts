import {UnitService} from '../services/unit.service';
import {MatSnackBar} from '@angular/material';
import { Unit } from './unit.entity';

export class UnitDeleteEntity {

  unitService: UnitService;

  snackBar: MatSnackBar;

  constructor(unitService, snackBar) {
    this.unitService = unitService;
    this.snackBar = snackBar;
  }

  deletes(unit: Unit): void {
    //  this.synchronizedGraph()
    this.unitService.delete(unit).subscribe(() => {
      this.snackBar.open('Eliminado Correctamente !', 'X', {
        duration: 8000
      });
    },
      () => {
        this.snackBar.open('Recurso no encontrado !', 'X', {
          duration: 8000
        });
      });
  }
}
