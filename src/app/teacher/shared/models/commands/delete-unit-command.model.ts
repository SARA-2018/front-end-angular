import { Command } from './command.model';
import { UnitService } from '../../services/unit.service';
import { Observable } from 'rxjs/Observable';

export class DeleteUnitCommand extends Command {

  code: number;

  constructor(code: number) {
    super();
    this.code = code;
  }

  execute(unitService?: UnitService): Observable<any> {
    return unitService.delete(this.code);
  }

}
