import { Command } from './command.model';
import { RelationService } from '../services/relation.service';
import { UnitService } from '../services/unit.service';

export class AddRelationCommand extends Command {

  private type: string;
  private semantics: string;
  private idTopUnit: number;
  private idLowerUnit: number;
  private cardinalTopUnit: string;
  private cardinalLowerUnit: string;

  constructor(type: string, idTopUnit: number, idLowerUnit: number, semantics?: string,
              cardinalTopUnit?: string, cardinalLowerUnit?: string) {
    super();
    this.idTopUnit = idTopUnit;
    this.idLowerUnit = idLowerUnit;
    this.type = type;
    this.semantics = semantics;
    this.cardinalTopUnit = cardinalTopUnit;
    this.cardinalLowerUnit = cardinalLowerUnit;
  }

  execute(unitService: UnitService, relationService: RelationService): void {
    relationService.create(this);
  }
}