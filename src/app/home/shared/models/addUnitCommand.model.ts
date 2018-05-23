import {Unit} from './unit.model';
import {UnitService} from '../services/unit.service';
import {Command} from './command.model';

export class AddUnitCommand extends Command {

  name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }

  public execute(unitService: UnitService): void {
    new Unit(this.name).saveUnit(unitService);
  }
}
