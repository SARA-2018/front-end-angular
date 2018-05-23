import { Command } from './command.model';
import { error } from 'util';

export class ErrorCommand extends Command {

  public execute(): void {
     error();
  }
}
