import {Command} from './command.model';
import { Unit } from '../unit.model';
import { UnitService } from '../../../graph-unit/services/unit.service';
import { Observable } from 'rxjs/Observable';

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
