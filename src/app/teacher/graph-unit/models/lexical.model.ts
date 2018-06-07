import * as Lex from 'lexical-parser';
import { TypeRelation } from './type-relation.enum';
import { ErrorCommand } from './commands/error-command.model';
import { DeleteUnitCommand } from './commands/delete-unit-command.model';
import { Command } from './commands/command.model';
import { AddUnitCommand } from './commands/add-unit-command.model';
import { AddRelationCommand } from './commands/add-relation-command.model';
import { CompositeCommand } from './commands/composite-command.model';
import { SearchFriendUnit } from './commands/search-friend-unit.model';
import { DeleteRelationCommand } from './commands/delete-relation-command.mode';
import { LoadCommand } from './commands/load-command.model';

export class Lexical {

  readonly tokenMatchers = [
    'new', '#', '~', '<', 'inherit', ':', '>', 'relation',
    'association', 'use', 'compose', ',', '*', '+', 'open',
    'load', '.',
    ['code', /[0-9]+/],
    ['text', /[a-záéíóúA-ZÁÀàÉÈèÍÌìÓÒòÚÙùÑñüÜ][a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ0-9]*/],
    ['cardinal', /\W.[n|m*+.(n|m*+)][0-9.(nm*+0-9)]+/],
  ];
  readonly ignorePattern = '[\n\s \t]+';
  codeTopUnit: number;
  codeLowerUnit: number;
  semantics: string;
  cardinalTopUnit: string;
  cardinalLowerUnit: string;
  nameUnit: string;
  deleteRelation: string;

  constructor() {
  }

  public analyzeCommand(command: string): Command {
    const lex = new Lex(command, this.tokenMatchers, this.ignorePattern);
    const token = lex.nextToken();
    switch (token['name']) {
      case '~':
        this.deleteRelation = token['name'];
        return this.analyzeCommandDeleteUnit(lex);
      case 'text':
        this.nameUnit = token['lexeme'];
        return this.analyzeCommandCreateUnit(lex);
      case 'load':
        return new LoadCommand();
      default:
        throw new ErrorCommand();
    }
  }

  private analyzeCommandDeleteUnit(lex: any): Command {
    const name = lex.nextToken();
    if (name['name'] !== 'text') {
      throw new ErrorCommand();
    }
    const sharp = lex.nextToken();
    if (sharp['name'] !== '#') {
      throw new ErrorCommand();
    }
    const code = lex.nextToken();
    this.codeTopUnit = code['lexeme'];
    if (code['name'] !== 'code') {
      throw new ErrorCommand();
    }
    const relation = lex.nextToken();
    if (relation === undefined) {
      return new DeleteUnitCommand(code['lexeme']);
    } else {
      return this.analyzeCommandDeleteRelation(lex, relation);
    }
  }

  private analyzeCommandDeleteRelation(lex: any, operator: any): Command {
    operator = operator['lexeme'];
    const relationToken = lex.nextToken();
    let relation = operator.concat(relationToken['lexeme']);
    if (relation === 'compose>' || relation === 'use>' || relation === 'association>' || relation === 'inherit>') {
      return this.sequenceUnit(lex, null, relation);
    }
    if (relation === '<compose' || relation === '<use' || relation === '<association' || relation === '<inherit') {
      const bidirectional = lex.nextToken();
      if (bidirectional['name'] === '>') {
        relation = relation.concat(bidirectional['lexeme']);
        if (relation === '<use>' || relation === '<association>') {
          return this.sequenceUnit(lex, null, relation);
        }
      }
      return this.sequenceUnit(lex, null, relation);
    }
  }

  private analyzeCommandCreateUnit(lex: any): Command {
    const sharp = lex.nextToken();
    if (sharp['name'] !== '#') {
      throw new ErrorCommand();
    }
    const number = lex.nextToken();
    if (number['name'] === 'new') {
      return new AddUnitCommand(this.nameUnit);
    }
    if (number['name'] === 'code') {
      this.codeTopUnit = number['lexeme'];
      return this.analyzeCommandSearchFriendUnit(lex);
    } else {
      throw new ErrorCommand();
    }
  }

  private analyzeCommandSearchFriendUnit(lex: any): Command {
    const token = lex.nextToken();
    if (token['name'] === 'open') {
      return new SearchFriendUnit(this.codeTopUnit);
    }
    if (token['name'] === ':') {
      const cardinal = lex.nextToken();
      if (cardinal['name'] === 'code' || cardinal['name'] === '+' || cardinal['name'] === '*') {
        this.cardinalTopUnit = cardinal['lexeme'];
        return this.analyzeCommandRelationByCardinal(lex);
      } else {
        throw new ErrorCommand();
      }
    }
    if (token['name'] === 'cardinal') {
      const cardinalTopUnit = token['lexeme'].split(':');
      this.cardinalTopUnit = cardinalTopUnit[1];
      return this.analyzeCommandRelationByCardinal(lex);
    }
    if (token['name'] === '<') {
      return this.analyzeCommandRelationByNotCardinal(lex);
    }
    if (token['name'] === 'inherit') {
      return this.analyzeCommandRelationsBySemantic(lex, TypeRelation.INHERIT, 'inherit>');
    }
    if (token['name'] === 'compose') {
      return this.analyzeCommandRelationCompose(lex, TypeRelation.COMPOSE, 'compose>');
    }
    if (token['name'] === 'association') {
      return this.analyzeCommandRelationsBySemantic(lex, TypeRelation.ASSOCIATION, 'association>');
    }
    if (token['name'] === 'use') {
      return this.analyzeCommandRelationsBySemantic(lex, TypeRelation.USE, 'use>');
    } else {
      throw new ErrorCommand();
    }
  }

  private analyzeCommandRelationByCardinal(lex: any): Command {
    const more = lex.nextToken();
    if (more['name'] === '<') {
      const relation = lex.nextToken();
      if (relation['name'] === 'compose') {
        return this.analyzeCommandRelationCompose(lex, TypeRelation.COMPOSE, '<compose');
      }
      if (relation['name'] === 'association') {
        return this.analyzeCommandRelationsBySemantic(lex, TypeRelation.ASSOCIATION, '<association');
      }
      if (relation['name'] === 'use') {
        return this.analyzeCommandRelationsBySemantic(lex, TypeRelation.USE, '<use');
      }
    }
    if (more['name'] === 'association') {
      return this.analyzeCommandRelationsBySemantic(lex, TypeRelation.ASSOCIATION, 'association>');
    }
    if (more['name'] === 'use') {
      return this.analyzeCommandRelationsBySemantic(lex, TypeRelation.USE, 'use>');
    }
  }

  private analyzeCommandRelationByNotCardinal(lex: any): Command {
    const relation = lex.nextToken();
    if (relation['name'] === 'inherit') {
      return this.analyzeCommandRelationsBySemantic(lex, TypeRelation.INHERIT, '<inherit');
    }
    if (relation['name'] === 'compose') {
      return this.analyzeCommandRelationCompose(lex, TypeRelation.COMPOSE, '<compose');
    }
    if (relation['name'] === 'association') {
      return this.analyzeCommandRelationsBySemantic(lex, TypeRelation.ASSOCIATION, '<association');
    }
    if (relation['name'] === 'use') {
      return this.analyzeCommandRelationsBySemantic(lex, TypeRelation.USE, '<use');
    }
    throw new ErrorCommand();
  }

  private analyzeCommandRelationCompose(lex: any, relationType: TypeRelation, relation: string): Command {
    if (relation === '<compose') {
      return this.sequenceUnit(lex, relationType, relation);
    }
    if (relation === 'compose>') {
      lex.nextToken();
      return this.sequenceUnit(lex, relationType, relation);
    } else {
      throw new ErrorCommand();
    }
  }

  private analyzeCommandRelationsBySemantic(lex: any, relationType: TypeRelation, relation: string): Command {
    const point = lex.nextToken();
    if (point['name'] !== ':') {
      return this.analyzeCommandByNotSemantic(lex, relationType, relation, point);
    }
    const text = lex.nextToken();
    this.semantics = text['lexeme'];
    if (text['name'] !== 'text') {
      throw new ErrorCommand();
    }
    const more = lex.nextToken();
    if (more['name'] === '>') {
      if (relation === 'association>' || relation === 'use>' || relation === 'inherit>') {
        return this.sequenceUnit(lex, relationType, relation);
      } else {
        return this.sequenceUnit(lex, relationType, relation.concat('>'));
      }
    } else {
      return this.sequenceUnit(lex, relationType, relation);
    }
  }

  private analyzeCommandByNotSemantic(lex: any, relationType: TypeRelation, relation: string, point: any) {
    const bidirectional = relation.concat(point['name']);
    if ( bidirectional === '<association>' || bidirectional === '<use>') {
      return this.sequenceUnit(lex, relationType, relation.concat(point['name']));
    } else {
      return this.sequenceUnit(lex, relationType, relation);
    }
  }

  private sequenceUnit(lex: any, relationType: TypeRelation, relation: string): Command {
    const name = lex.nextToken();
    if (name['name'] !== 'text' && name['name'] !== '#') {
      throw new ErrorCommand();
    }
    const sharp = lex.nextToken();
    if (sharp['name'] === '#') {
      const number = lex.nextToken();
      this.codeLowerUnit = number['lexeme'];
      if (number['name'] !== 'code') {
        throw new ErrorCommand();
      }
      if (lex['workingInput'].trim() === '') {
        return this.saveOrDeleteRelation(relationType, relation);
      } else {
        return this.executeCommands(lex, relationType, relation);
      }
    }
    if (sharp['name'] === 'code') {
      this.codeLowerUnit = sharp['lexeme'];
      if (lex['workingInput'].trim() === '') {
        return this.saveOrDeleteRelation(relationType, relation);
      } else {
        return this.executeCommands(lex, relationType, relation);
      }
    }
  }

  private createDeleteSingleRelation(relationType: TypeRelation, relation: string): Command {
    if (relation === '<association' || relation === '<use') {
      if (this.deleteRelation === '~') {
        return new DeleteRelationCommand(this.codeTopUnit, this.codeLowerUnit);
      }
      return new AddRelationCommand(relationType, this.codeTopUnit, this.codeLowerUnit, this.semantics, this.cardinalTopUnit,
        this.cardinalLowerUnit);
    }
    if (relation === 'compose>' || relation === 'association>' || relation === 'use>') {
      if (this.deleteRelation === '~') {
        return new DeleteRelationCommand(this.codeLowerUnit, this.codeTopUnit);
      }
      return new AddRelationCommand(relationType, this.codeLowerUnit, this.codeTopUnit, this.semantics, this.cardinalLowerUnit,
        this.cardinalTopUnit);
    }
    if (relation === '<association>' || relation === '<use>') {
      const commands = new CompositeCommand();
      if (this.deleteRelation === '~') {
        commands.add(new DeleteRelationCommand(this.codeTopUnit, this.codeLowerUnit));
        commands.add(new DeleteRelationCommand(this.codeLowerUnit, this.codeTopUnit));
        return commands;
      }
      commands.add(new AddRelationCommand(relationType, this.codeTopUnit, this.codeLowerUnit, this.semantics, this.cardinalTopUnit,
        this.cardinalLowerUnit));
      commands.add(new AddRelationCommand(relationType, this.codeLowerUnit, this.codeTopUnit, this.semantics, this.cardinalLowerUnit,
        this.cardinalTopUnit));
      return commands;
    } else {
      throw new ErrorCommand();
    }
  }

  private createDeleteGroupRelations(lex, relationType: TypeRelation, relation: string): Command {
    let codes;
    const idLowerUnits = [];
    const cardinalsLowerUnit = [];
    do {
      codes = lex.nextToken();
      if (codes !== undefined) {
        if (codes['name'] === 'code') {
          idLowerUnits.push(codes['lexeme']);
        } else if (codes['name'] === 'cardinal') {
          const cardinalAux = codes['lexeme'].split(':');
          cardinalsLowerUnit.push(cardinalAux[1]);
        } else if (codes['name'] === ':') {
          codes = lex.nextToken();
          if (codes['name'] === 'code' || codes['name'] === '+' || codes['name'] === '*') {
            cardinalsLowerUnit.push(codes['lexeme']);
          }
        }
      }
    } while (codes);
    idLowerUnits.unshift(this.codeLowerUnit);
    cardinalsLowerUnit.unshift(this.cardinalLowerUnit);
    const commands = new CompositeCommand();
    for (let i = 0; i < idLowerUnits.length; i++) {
      if (relation === '<inherit' || relation === '<compose' || relation === '<association' || relation === '<use' || relation === '<use>'
        || relation === '<association>') {
        if (this.deleteRelation === '~') {
          commands.add(new DeleteRelationCommand(this.codeTopUnit, idLowerUnits[i]));
        } else {
          commands.add(new AddRelationCommand(relationType, this.codeTopUnit, idLowerUnits[i], this.semantics, this.cardinalTopUnit,
            cardinalsLowerUnit[i]));
        }
      }
      if (relation === 'inherit>' || relation === 'compose>' || relation === 'association>' || relation === 'use>' || relation === '<use>'
        || relation === '<association>') {
        if (this.deleteRelation === '~') {
          commands.add(new DeleteRelationCommand(idLowerUnits[i], this.codeTopUnit));
        } else {
          commands.add(new AddRelationCommand(relationType, idLowerUnits[i], this.codeTopUnit, this.semantics, cardinalsLowerUnit[i],
            this.cardinalTopUnit));
        }
      }
    }
    return commands;
  }

  private saveOrDeleteRelation(relationType: TypeRelation, relation: string): Command {
    if (relation === '<inherit' || relation === '<compose') {
      if (this.deleteRelation === '~') {
        return new DeleteRelationCommand(this.codeTopUnit, this.codeLowerUnit);
      }
      return new AddRelationCommand(relationType, this.codeTopUnit, this.codeLowerUnit, this.semantics, this.cardinalTopUnit, undefined);
    }
    if (relation === 'inherit>') {
      if (this.deleteRelation === '~') {
        return new DeleteRelationCommand(this.codeLowerUnit, this.codeTopUnit);
      }
      return new AddRelationCommand(relationType, this.codeLowerUnit, this.codeTopUnit, this.semantics, undefined, undefined);
    } else {
      return this.createDeleteSingleRelation(relationType, relation);
    }
  }

  private saveRelationByCardinal(lex: any, relationType: TypeRelation, relation: string): Command {
    const cardinal = lex.nextToken();
    if (cardinal['name'] === 'code' || cardinal['name'] === '+' || cardinal['name'] === '*') {
      this.cardinalLowerUnit = cardinal['lexeme'];
      const point = lex.nextToken();
      if (point === undefined) {
        return this.createDeleteSingleRelation(relationType, relation);
      } else if (point['name'] === ',') {
        return this.createDeleteGroupRelations(lex, relationType, relation);
      } else {
        throw new ErrorCommand();
      }
    } else {
      throw new ErrorCommand();
    }
  }

  private executeCommands(lex: any, relationType: TypeRelation, relation: string): Command {
    const token = lex.nextToken();
    if (token['name'] === 'cardinal') {
      const cardinalLowerUnit = token['lexeme'].split(':');
      this.cardinalLowerUnit = cardinalLowerUnit[1];
      if (lex['workingInput'].trim() === '') {
        return this.createDeleteSingleRelation(relationType, relation);
      }
      const point = lex.nextToken();
      if (point['name'] === ',') {
        return this.createDeleteGroupRelations(lex, relationType, relation);
      }
    } else if (token['name'] === ':') {
      return this.saveRelationByCardinal(lex, relationType, relation);
    } else if (token['name'] === ',') {
      return this.createDeleteGroupRelations(lex, relationType, relation);
    } else {
      throw new ErrorCommand();
    }
  }
}
