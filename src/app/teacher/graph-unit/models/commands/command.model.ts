import { UnitService } from '../../services/unit.service';
import { RelationService } from '../../services/relation.service';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';


 export abstract class Command {

  abstract execute(unitService?: UnitService, relationService?: RelationService, dialog?: MatDialog): Observable<any>;

  isOpenUnit(): boolean {
    return false;
  }
}
