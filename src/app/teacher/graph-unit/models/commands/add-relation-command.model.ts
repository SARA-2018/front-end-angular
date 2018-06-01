import { Command } from './command.model';
import { TypeRelation } from '../type-relation.enum';
import { RelationService } from '../../../graph-unit/services/relation.service';
import { Observable } from 'rxjs/Observable';


export class AddRelationCommand extends Command {

  private type: TypeRelation;
  private semantics: string;
  private topUnitCode: number;
  private lowerUnitCode: number;
  private cardinalTopUnit: string;
  private cardinalLowerUnit: string;

  constructor(type: TypeRelation, topUnitCode: number, lowerUnitCode: number, semantics: string, cardinalTopUnit: string,
              cardinalLowerUnit: string) {
    super();
    this.type = type;
    this.topUnitCode = topUnitCode;
    this.lowerUnitCode = lowerUnitCode;
    this.semantics = semantics;
    this.cardinalTopUnit = cardinalTopUnit;
    this.cardinalLowerUnit = cardinalLowerUnit;
  }

  execute(undefined, relationService: RelationService): Observable<any> {
    return relationService.create(this);
  }
}
