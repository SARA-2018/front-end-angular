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
    return new Observable(observer => {
      for (let i = 0; i < this.commands.length; i++) {
        this.commands[i].execute(unitService, relationService).subscribe();
        observer.next();
      }
      observer.next();
      observer.complete();
    });
  }

  public add(command: Command): void {
    this.commands.push(command);
  }
}
