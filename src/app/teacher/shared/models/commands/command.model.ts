import { UnitService } from '../../services/unit.service';
import { RelationService } from '../../services/relation.service';


 export abstract class Command {

  abstract execute(unitService?: UnitService, relationService?: RelationService);
}
