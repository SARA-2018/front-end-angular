import { Command } from './command.model';
import { Observable } from 'rxjs/Observable';

export class ErrorCommand extends Command {

  constructor() {
    super();
  }
  public execute(): Observable<any> {
    function Error() {
      this.name = 'ErrorCommand';
    }
    Error.prototype = Object.create(Error.prototype);
    Error.prototype.constructor = Error;
    return new Observable(() => Error());
  }
}
