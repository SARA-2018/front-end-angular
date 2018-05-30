import { Command } from './command.model';
import { UnitService } from '../../services/unit.service';
import { RelationService } from '../../services/relation.service';
import { Observable } from 'rxjs/Observable';

export class SearchFriendUnit extends Command {

  private codeTopUnit;

  constructor(codeTopUnit: number) {
    super();
    this.codeTopUnit = codeTopUnit;
  }

  execute(unitService?: UnitService, relationService?: RelationService): Observable<any> {
    return unitService.getByFriend(this.codeTopUnit);
  }

}
