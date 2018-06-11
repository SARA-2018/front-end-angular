import { Command } from './command.model';
import { Observable } from 'rxjs/Observable';
import { RelationService } from '../../services/relation.service';
import { CancelYesDialogComponent } from '../../../../core/cancel-yes-dialog.component';
import { MatDialog } from '@angular/material';

export class DeleteRelationCommand extends Command {

  topUnitCode: number;
  lowerUnitCode: number;

  constructor(topUnitCode: number, lowerUnitCode: number) {
    super();
    this.topUnitCode = topUnitCode;
    this.lowerUnitCode = lowerUnitCode;
  }

  execute(undefined, relationService: RelationService, dialog: MatDialog): Observable<any> {
    return new Observable(observer => {
      dialog.open(CancelYesDialogComponent).afterClosed().subscribe(
        result => {
          if (result) {
            return relationService.delete(this).subscribe(() => {
                observer.next();
              }
            );
          }
        });
    });
  }
}
