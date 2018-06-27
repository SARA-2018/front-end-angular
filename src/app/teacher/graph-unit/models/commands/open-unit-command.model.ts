import { Command } from './command.model';
import { UnitService } from '../../../../shared/services/unit.service';
import { Observable } from 'rxjs/Observable';

export class OpenUnitCommand extends Command {

  private codeTopUnit;

  constructor(codeTopUnit: number) {
    super();
    this.codeTopUnit = codeTopUnit;
  }

  execute(unitService: UnitService): Observable<any> {
    return unitService.getFriendsByCode(this.codeTopUnit);
  }

  isOpenUnit(): boolean {
    return true;
  }

}
