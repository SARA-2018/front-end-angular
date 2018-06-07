import { Command } from './command.model';
import { UnitService } from '../../../graph-unit/services/unit.service';
import { Observable } from 'rxjs/Observable';

export class OpenUnit extends Command {

  private codeTopUnit;

  constructor(codeTopUnit: number) {
    super();
    this.codeTopUnit = codeTopUnit;
    console.log('construye open');
  }

  execute(unitService: UnitService): Observable<any> {
    console.log('ejecutado open');
    return unitService.getFriendsByCode(this.codeTopUnit);
  }

}
