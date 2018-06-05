import { UnitService } from '../../services/unit.service';
import { RelationService } from '../../services/relation.service';
import { MatDialog } from '@angular/material';


 export abstract class Command {

  abstract execute(unitService?: UnitService, relationService?: RelationService, dialog?: MatDialog);
}
