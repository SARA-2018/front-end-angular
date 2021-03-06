import { Command } from './command.model';
import { Unit } from '../../../../shared/models/unit.model';
import { Observable } from 'rxjs/Observable';
import { UnitService } from '../../../../shared/services/unit.service';

export class AddUnitCommand extends Command {

  name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }

  public execute(unitService: UnitService): Observable<any> {
    return new Unit(this.name).saveUnit(unitService);
  }
}
