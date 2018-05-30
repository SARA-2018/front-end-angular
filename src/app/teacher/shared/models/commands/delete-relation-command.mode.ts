import { Command } from './command.model';
import { UnitService } from '../../services/unit.service';
import { Observable } from 'rxjs/Observable';
import { RelationService } from '../../services/relation.service';

export class DeleteRelationCommand extends Command {

  topUnitCode: number;
  lowerUnitCode: number;

  constructor(topUnitCode: number, lowerUnitCode: number) {
    super();
    this.topUnitCode = topUnitCode;
    this.lowerUnitCode = lowerUnitCode;
  }

  execute(unitService?: UnitService, relationService?: RelationService): Observable<any> {
<<<<<<< HEAD
    console.log(this);
    return null;
    // return relationService.delete(this);
=======
    return relationService.delete(this);
>>>>>>> develop
  }

}
