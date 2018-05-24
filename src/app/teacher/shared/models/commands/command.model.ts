import { UnitService } from '../../services/unit.service';
import { RelationService } from '../../services/relation.service';
import { Observable } from 'rxjs/Observable';


 export abstract class Command {

  abstract execute(unitService?: UnitService, relationService?: RelationService): Observable<any>;
}
