import { Command } from './command.model';
import { UnitService } from '../../services/unit.service';

export class DeleteUnitCommand extends Command {

  code: number;

  constructor(code: number) {
    super();
    this.code = code;
  }

  execute(unitService?: UnitService) {
    unitService.delete(this.code);
  }

}
