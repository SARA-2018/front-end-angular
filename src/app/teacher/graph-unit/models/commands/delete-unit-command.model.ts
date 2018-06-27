import { Command } from './command.model';
import { UnitService } from '../../../../shared/services/unit.service';
import { Observable } from 'rxjs/Observable';
import { CancelYesDialogComponent } from '../../../../core/cancel-yes-dialog.component';
import { MatDialog } from '@angular/material';

export class DeleteUnitCommand extends Command {

  code: number;

  constructor(code: number) {
    super();
    this.code = code;
  }

  execute(unitService: UnitService, undefined, dialog: MatDialog): Observable<any> {
    return new Observable(observer => {
      dialog.open(CancelYesDialogComponent).afterClosed().subscribe(
        result => {
          if (result) {
            return unitService.delete(this.code).subscribe(() => {
              observer.next();
            }
            );
          }
        });
    });
  }

}
