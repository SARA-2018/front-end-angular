import { Command } from './command.model';
import { Observable } from 'rxjs/Observable';

export class ErrorCommand extends Command {

  constructor() {
    super();
  }
  public execute(): Observable<any> {
    function error() {
      this.name = 'ErrorCommand';
    }
    error.prototype = Object.create(error.prototype);
    error.prototype.constructor = error;
    return new Observable(() => error());
  }
}
