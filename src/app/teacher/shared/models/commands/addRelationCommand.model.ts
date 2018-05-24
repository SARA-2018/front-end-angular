import { Command } from './command.model';
import { TypeRelation } from '../type-relation.enum';
import { UnitService } from '../../services/unit.service';
import { RelationService } from '../../services/relation.service';


export class AddRelationCommand extends Command {

  private type: TypeRelation;
  private semantics: string;
  private idTopUnit: number;
  private idLowerUnit: number;
  private cardinalTopUnit: string;
  private cardinalLowerUnit: string;

  constructor(type: TypeRelation, idTopUnit: number, idLowerUnit: number, semantics: string, cardinalTopUnit: string, cardinalLowerUnit: string) {
    super();
    this.type = type;
    this.idTopUnit = idTopUnit;
    this.idLowerUnit = idLowerUnit;
    this.semantics = semantics;
    this.cardinalTopUnit = cardinalTopUnit;
    this.cardinalLowerUnit = cardinalLowerUnit;
  }

  execute(unitService: UnitService, relationService: RelationService): void {
    relationService.create(this);
  }
}
