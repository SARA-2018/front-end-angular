import * as Lex from 'lexical-parser';
import { TypeRelation } from './type-relation.enum';
import { ErrorCommand } from './commands/errorCommand.model';
import { DeleteUnitCommand } from './commands/deleteUnitCommand.model';
import { Command } from './commands/command.model';
import { AddUnitCommand } from './commands/addUnitCommand.model';
import { AddRelationCommand } from './commands/addRelationCommand.model';

export class Lexical {

  readonly tokenMatchers = [
    'new', '#', '~', '<', 'inherit', ':', '>', 'relation',
    'association', 'use', 'compose', ',', '*', '+',
    ['code', /[0-9]+/],
    ['text', /[a-záéíóúA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ][a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ0-9]*/],
    ['cardinal', /\W.[n|m*+.(n|m*+)][0-9.(nm*+0-9)]+/],
  ];
  readonly ignorePattern = '[\n\s \t]+';
  codeTopUnit: number;
  codeLowerUnit: number;
  semantics: string;
  cardinalTopUnit: string;
  cardinalLowerUnit: string;
  nameUnit: string;

  constructor() {
  }

  public analyzeCommand(command: string): Command {
    const lex = new Lex(command, this.tokenMatchers, this.ignorePattern);
    const token = lex.nextToken();
    switch (token['name']) {
      case '~':
        return this.analyzeCommandDeleteUnit(lex);
      case 'text':
        this.nameUnit = token['lexeme'];
        return this.analyzeCommandCreateUnit(lex);
      default:
        return new ErrorCommand();
    }
  }

  private analyzeCommandDeleteUnit(lex): Command {
    const name = lex.nextToken();
    if (name['name'] !== 'text') {
      return new ErrorCommand();
    }
    const sharp = lex.nextToken();
    if (sharp['name'] !== '#') {
      return new ErrorCommand();
    }
    const code = lex.nextToken();
    if (code['name'] !== 'code') {
      return new ErrorCommand();
    }
    const relation = lex.nextToken();
    if (relation === undefined) {
      return new DeleteUnitCommand(code['lexeme']);
    } else {
      if (relation['name'] === 'relation') {
        // this.analyzeCommandDeleteRelation();
      }
    }
  }

  private analyzeCommandCreateUnit(lex): Command {
    const sharp = lex.nextToken();
    if (sharp['name'] !== '#') {
      return new ErrorCommand();
    }
    const number = lex.nextToken();
    if (number['name'] === 'new') {
      return new AddUnitCommand(this.nameUnit);
    }
    if (number['name'] === 'code') {
      this.codeTopUnit = number['lexeme'];
      return this.analyzeCommandUpdateUnit(lex);
    } else {
      return new ErrorCommand();
    }
  }

  private analyzeCommandUpdateUnit(lex): Command {
    const token = lex.nextToken();
    if (token['name'] === ':') {
      const cardinal = lex.nextToken();
      if (cardinal === undefined) {
        // Update Unit;
      }
      if (cardinal['name'] === 'code' || cardinal['name'] === '+' || cardinal['name'] === '*') {
        this.cardinalTopUnit = cardinal['lexeme'];
        return this.analyzeCommandRelationByCardinal(lex);
      } else {
        return new ErrorCommand();
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
      return this.analyzeCommandRelationAssociationOrUseOrInherit(lex, TypeRelation.INHERIT, 'inherit>');
    }
    if (token['name'] === 'compose') {
      return this.analyzeCommandRelationCompose(lex, TypeRelation.COMPOSE, 'compose>');
    }
    if (token['name'] === 'association') {
      return this.analyzeCommandRelationAssociationOrUseOrInherit(lex, TypeRelation.ASSOCIATION, 'association>');
    }
    if (token['name'] === 'use') {
      return this.analyzeCommandRelationAssociationOrUseOrInherit(lex, TypeRelation.USE, 'use>');
    } else {
      return new ErrorCommand();
    }
  }

  private analyzeCommandRelationByCardinal(lex): Command {
    const more = lex.nextToken();
    if (more['name'] === '<') {
      const relation = lex.nextToken();
      if (relation['name'] === 'compose') {
        return this.analyzeCommandRelationCompose(lex, TypeRelation.COMPOSE, '<compose');
      }
      if (relation['name'] === 'association') {
        return this.analyzeCommandRelationAssociationOrUseOrInherit(lex, TypeRelation.ASSOCIATION, '<association');
      }
      if (relation['name'] === 'use') {
        return this.analyzeCommandRelationAssociationOrUseOrInherit(lex, TypeRelation.USE, '<use');
      }
    }
    if (more['name'] === 'association') {
      return this.analyzeCommandRelationAssociationOrUseOrInherit(lex, TypeRelation.ASSOCIATION, 'association>');
    }
    if (more['name'] === 'use') {
      return this.analyzeCommandRelationAssociationOrUseOrInherit(lex, TypeRelation.USE, 'use>');
    }
  }

  private analyzeCommandRelationByNotCardinal(lex): Command {
    const relation = lex.nextToken();
    if (relation['name'] === 'inherit') {
      return this.analyzeCommandRelationAssociationOrUseOrInherit(lex, TypeRelation.INHERIT, '<inherit');
    }
    if (relation['name'] === 'compose') {
      return this.analyzeCommandRelationCompose(lex, TypeRelation.COMPOSE, '<compose');
    }
    if (relation['name'] === 'association') {
      return this.analyzeCommandRelationAssociationOrUseOrInherit(lex, TypeRelation.ASSOCIATION, '<association');
    }
    if (relation['name'] === 'use') {
      return this.analyzeCommandRelationAssociationOrUseOrInherit(lex, TypeRelation.USE, '<use');
    }
    return new ErrorCommand();
  }

  private analyzeCommandRelationCompose(lex, relationType: TypeRelation, relation: string): Command {
    if (relation === '<compose') {
      return this.sequenceUnit(relationType, lex, relation);
    }
    if (relation === 'compose>') {
      lex.nextToken();
      return this.sequenceUnit(relationType, lex, relation);
    } else {
      return new ErrorCommand();
    }
  }

  private analyzeCommandRelationAssociationOrUseOrInherit(lex, relationType: TypeRelation, relation: string): Command {
    const point = lex.nextToken();
    if (point['name'] === ':') {
      const text = lex.nextToken();
      this.semantics = text['lexeme'];
      if (text['name'] !== 'text') {
        return new ErrorCommand();
      }
      if (relation === '<association' || relation === '<use' || relation === '<inherit') {
        return this.sequenceUnit(relationType, lex, relation);
      }
      if (relation === 'association>' || relation === 'use>' || relation === 'inherit>') {
        lex.nextToken();
        return this.sequenceUnit(relationType, lex, relation);
      } else {
        return new ErrorCommand();
      }
    } else {
      if (relation) {
        return this.sequenceUnit(relationType, lex, relation);
      } else {
        return new ErrorCommand();
      }
    }
  }

  private sequenceUnit(relationType: TypeRelation, lex, relation: string): Command {
    const name = lex.nextToken();
    if (name['name'] !== 'text' && name['name'] !== '#') {
      return new ErrorCommand();
    }
    const sharp = lex.nextToken();
    if (sharp['name'] === '#') {
      const number = lex.nextToken();
      this.codeLowerUnit = number['lexeme'];
      if (number['name'] !== 'code') {
        return new ErrorCommand();
      }
    }
    if (sharp['name'] === 'code') {
      this.codeLowerUnit = sharp['lexeme'];
    }

    const token = lex.nextToken();
    if (token === undefined) {
      return this.createSingleRelation(relationType, relation);
    } else if (token['name'] === 'cardinal') {
      const cardinalLowerUnit = token['lexeme'].split(':');
      this.cardinalLowerUnit = cardinalLowerUnit[1];
      const point = lex.nextToken();
      if (point === undefined) {
        return this.createSingleRelation(relationType, relation);
      } else if (point['name'] === ',') {
        return this.createGroupRelations(lex, relation, relationType);
      }
    } else if (token['name'] === ':') {
      const cardinal = lex.nextToken();
      if (cardinal['name'] === 'code' || cardinal['name'] === '+' || cardinal['name'] === '*') {
        this.cardinalLowerUnit = cardinal['lexeme'];
        const point = lex.nextToken();
        if (point === undefined) {
          return this.createSingleRelation(relationType, relation);
        } else if (point['name'] === ',') {
            return this.createGroupRelations(lex, relation, relationType);
        } else {
          return new ErrorCommand();
        }
      } else {
        return new ErrorCommand();
      }
    } else if (token['name'] === ',') {
      return this.createGroupRelations(lex, relation, relationType);
    } else {
      return new ErrorCommand();
    }
  }

  private createGroupRelations(lex, relation: string, relationType: TypeRelation): Command {
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

    const commands: Command[] = [];
    for (let i = 0; i < idLowerUnits.length; i++) {
      if (relation === '<inherit' || relation === '<compose' || relation === '<association' || relation === '<use') {
        commands.push(new AddRelationCommand(relationType, this.codeTopUnit, idLowerUnits[i], this.semantics, this.cardinalTopUnit,
          cardinalsLowerUnit[i]));
      }
      if (relation === 'inherit>' || relation === 'compose>' || relation === 'association>' || relation === 'use>') {
        commands.push(new AddRelationCommand(relationType,  idLowerUnits[i], this.codeTopUnit, this.semantics, cardinalsLowerUnit[i],
          this.cardinalTopUnit));
      }
    }

     // console.log(commands.slice.call(arguments));

   //  return JSON.parse(commands.toString());
     // console.log(commands);
    for (const command of commands) {
    return command;
      // console.log(command);
      // return new commands;
     // console.log(command);
     // return command;
     }
    // return commands;
  }

  private createSingleRelation(relationType: TypeRelation, relation: string): Command {
    if (relation === '<inherit' || relation === '<compose' || relation === '<association' || relation === '<use') {
      return new AddRelationCommand(relationType, this.codeTopUnit, this.codeLowerUnit, this.semantics, this.cardinalTopUnit,
        this.cardinalLowerUnit);
    }
    if (relation === 'inherit>' || relation === 'compose>' || relation === 'association>' || relation === 'use>') {
      return new AddRelationCommand(relationType, this.codeLowerUnit, this.codeTopUnit, this.semantics, this.cardinalLowerUnit,
        this.cardinalTopUnit);
    } else {
      return new ErrorCommand();
    }
  }
}
