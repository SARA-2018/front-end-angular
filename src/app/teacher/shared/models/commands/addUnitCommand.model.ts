
import {Command} from './command.model';
import { Unit } from '../unit.model';
import { UnitService } from '../../services/unit.service';

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
