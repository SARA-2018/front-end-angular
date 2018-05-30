import { Command } from './command.model';
import { UnitService } from '../../services/unit.service';
import { RelationService } from '../../services/relation.service';
import { Observable } from 'rxjs/Observable';

export class CompositeCommand extends Command {

  private commands: Command[] = [];

  constructor() {
    super();
  }

  execute(unitService: UnitService, relationService: RelationService): Observable<any> {
    let observable: Observable<any>;
    for (const command of this.commands) {
      observable = command.execute(unitService, relationService);
    }
    return observable;
  }

  public add(command: Command): void {
    this.commands.push(command);
  }
}
