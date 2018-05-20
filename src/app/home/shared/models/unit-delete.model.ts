import {UnitService} from '../services/unit.service';
import {MatSnackBar} from '@angular/material';
export class UnitDelete {

  unitService: UnitService;

  snackBar: MatSnackBar;

  constructor(unitService, snackBar) {
    this.unitService = unitService;
    this.snackBar = snackBar;
  }

  deletes(id: number): void {
    this.unitService.delete(id).subscribe(() => {
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
