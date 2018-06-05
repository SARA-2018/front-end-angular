import { UnitService } from '../../../graph-unit/services/unit.service';
import { RelationService } from '../../../graph-unit/services/relation.service';
import { MatDialog } from '@angular/material';


 export abstract class Command {

  abstract execute(unitService?: UnitService, relationService?: RelationService, dialog?: MatDialog);
}
