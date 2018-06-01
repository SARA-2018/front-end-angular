import { UnitService } from '../../services/unit.service';
import { RelationService } from '../../services/relation.service';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';


 export abstract class Command {

  abstract execute(unitService?: UnitService, relationService?: RelationService, dialog?: MatDialog): Observable<any>;
}
