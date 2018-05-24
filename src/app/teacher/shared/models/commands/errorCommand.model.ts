import { Command } from './command.model';
import { error } from 'util';
import { Observable } from 'rxjs/Observable';

export class ErrorCommand extends Command {

  public execute(): Observable<any> {
    return new Observable(observer => error());
  }
}
