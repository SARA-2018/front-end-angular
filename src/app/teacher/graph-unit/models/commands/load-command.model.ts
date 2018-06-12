import { Command } from './command.model';
import { UnitService } from '../../../shared/unit.service';
import { RelationService } from '../../services/relation.service';
import { Lexical } from '../lexical.model';
import { Observable } from 'rxjs/Observable';

export class LoadCommand extends Command {

  constructor() {
    super();
  }

  execute(unitService: UnitService, relationService: RelationService): Observable<any> {

    return new Observable(observer => {
      const file = (<HTMLInputElement>document.getElementById('file')).files[0];
      const reader = new FileReader();
        const lexical = new Lexical();
        reader.onload = function () {
          const lines = this.result.split('\n');
          for (let i = 0; i < lines.length; i++) {
            const command: Command = lexical.analyzeCommand(lines[i]);
            command.execute(unitService, relationService).subscribe();
            observer.next();
          }
          observer.complete();
        };
        reader.readAsText(file);
    });
  }
}
