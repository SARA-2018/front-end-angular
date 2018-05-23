import * as Lex from 'lexical-parser';
import { TypeRelation } from './type-relation.enum';
import { error } from 'util';
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

  constructor() {
  }

  public analyzeCommand(command: string): Command {
      const lex = new Lex(command, this.tokenMatchers, this.ignorePattern);
      const token = lex.nextToken();
      switch (token['name']) {
        case '~':
          const val = command.split('~');
          command = val.pop();
          return this.analyzeCommandDeleteUnit(command);
        case 'text':
          const text = command.split(token['lexeme']);
          command = text.pop();
          return this.analyzeCommandCreateUnit(command, token);
        default:
          return new ErrorCommand();
      }
  }

  private analyzeCommandDeleteUnit(commandDelete: string): Command {
    const lex = new Lex(commandDelete, this.tokenMatchers, this.ignorePattern);
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

  private analyzeCommandCreateUnit(command: string, name: object): Command {
    const lex = new Lex(command, this.tokenMatchers, this.ignorePattern);
    const sharp = lex.nextToken();
    if (sharp['name'] !== '#') {
      return new ErrorCommand();
    }
    const number = lex.nextToken();
    if (number['name'] === 'new') {
      return new AddUnitCommand(name['lexeme']);
    }
    if (number['name'] === 'code') {
      this.codeTopUnit = number['lexeme'];
      return this.analyzeCommandUpdateUnit(command, lex);
    } else {
      return new ErrorCommand();
    }
  }

  private analyzeCommandUpdateUnit(command: string, lex): Command {
    const token = lex.nextToken();
    if (token['name'] === ':') {
      const cardinal = lex.nextToken();
      if (cardinal === undefined) {
        // Update Unit;
      }
      if (cardinal['name'] === 'code' || cardinal['name'] === '+' || cardinal['name'] === '*') {
        this.cardinalTopUnit = cardinal['lexeme'];
        return this.analyzeCommandRelationByOperatorCardinal(command, lex);
      } else {
        return new ErrorCommand();
      }
    }
    if (token['name'] === 'cardinal') {
      return this.analyzeCommandRelationByCardinal(command, lex, token);
    }
    if (token['name'] === '<') {
      return this.analyzeCommandRelationByNotCardinal(command, lex);
    }
    if (token['name'] === 'inherit') {
      return this.analyzeCommandRelationInherit(command, lex);
    }
    if (token['name'] === 'compose') {
      return this.analyzeCommandRelationCompose(command);
    }
    if (token['name'] === 'association') {
      return this.analyzeCommandRelationAssociationOrUse(command, lex, TypeRelation.ASSOCIATION);
    }
    if (token['name'] === 'use') {
      return this.analyzeCommandRelationAssociationOrUse(command, lex, TypeRelation.USE);
    } else {
      return new ErrorCommand();
    }
  }

  private analyzeCommandRelationByOperatorCardinal(command: string, lex): Command {
    const more = lex.nextToken();
    if (more['name'] === '<') {
      const relation = lex.nextToken();
      if (relation['name'] === 'compose') {
        return this.analyzeCommandRelationCompose(command);
      }
      if (relation['name'] === 'association') {
        return this.analyzeCommandRelationAssociationOrUse(command, lex, TypeRelation.ASSOCIATION);
      }
      if (relation['name'] === 'use') {
        return this.analyzeCommandRelationAssociationOrUse(command, lex, TypeRelation.USE);
      } else {
        return new ErrorCommand();
      }
    }
    if (more['name'] === 'association') {
      return this.analyzeCommandRelationAssociationOrUse(command, lex, TypeRelation.ASSOCIATION);
    }
    if (more['name'] === 'use') {
      return this.analyzeCommandRelationAssociationOrUse(command, lex, TypeRelation.USE);
    } else {
      return new ErrorCommand();
    }
  }

  private analyzeCommandRelationByCardinal(command: string, lex, token): Command {
    const cardinalTopUnit = token['lexeme'].split(':');
    this.cardinalTopUnit = cardinalTopUnit[1];
    const more = lex.nextToken();
    if (more['name'] === '<') {
      const relation = lex.nextToken();
      if (relation['name'] === 'compose') {
        return this.analyzeCommandRelationCompose(command);
      }
      if (relation['name'] === 'association') {
        return this.analyzeCommandRelationAssociationOrUse(command, lex, TypeRelation.ASSOCIATION);
      }
      if (relation['name'] === 'use') {
        return this.analyzeCommandRelationAssociationOrUse(command, lex, TypeRelation.USE);
      }
    }
    if (more['name'] === 'association') {
      return this.analyzeCommandRelationAssociationOrUse(command, lex, TypeRelation.ASSOCIATION);
    }
    if (more['name'] === 'use') {
      return this.analyzeCommandRelationAssociationOrUse(command, lex, TypeRelation.USE);
    }
  }

  private analyzeCommandRelationByNotCardinal(command: string, lex): Command {
    const relation = lex.nextToken();
    if (relation['name'] === 'inherit') {
      return this.analyzeCommandRelationInherit(command, lex);
    }
    if (relation['name'] === 'compose') {
      return this.analyzeCommandRelationCompose(command);
    }
    if (relation['name'] === 'association') {
      return this.analyzeCommandRelationAssociationOrUse(command, lex, TypeRelation.ASSOCIATION);
    }
    if (relation['name'] === 'use') {
      return this.analyzeCommandRelationAssociationOrUse(command, lex, TypeRelation.USE);
    }
    return new ErrorCommand();
  }

  private analyzeCommandRelationCompose(command: string): Command {
    const lexByOperator = new Lex(command, this.tokenMatchers, this.ignorePattern);
    for (let i = 0; i <= 3; i++) {
      lexByOperator.nextToken();
    }
    let token;
    const relation = [];
    const lexCardinal = new Lex(command, this.tokenMatchers, this.ignorePattern);
    for (let i = 0; i <= 5; i++) {
      token = lexCardinal.nextToken();
      relation.push(token['name']);
    }
    if (relation[4] + relation[5] === '<compose') {
      return this.sequenceUnit(TypeRelation.COMPOSE, lexCardinal, '<compose');
    }
    if (relation[3] + relation[4] === '<compose') {
      lexByOperator.nextToken();
      return this.sequenceUnit(TypeRelation.COMPOSE, lexByOperator, '<compose');
    }
    if (relation[2] + relation[3] === '<compose' || relation[2] + relation[3] === 'compose>') {
      return this.sequenceUnit(TypeRelation.COMPOSE, lexByOperator, relation[2] + relation[3]);
    } else {
      return new ErrorCommand();
    }
  }

  private analyzeCommandRelationAssociationOrUse(command: string, lex, relationType: TypeRelation): Command {
    const lexSemantics = new Lex(command, this.tokenMatchers, this.ignorePattern);
    let token;
    const relation = [];
    for (let i = 0; i <= 7; i++) {
      token = lexSemantics.nextToken();
      if (token !== undefined) {
        relation.push(token['name']);
      }
    }
    const point = lex.nextToken();
    if (point['name'] === ':') {
      const text = lex.nextToken();
      this.semantics = text['lexeme'];
      if (text['name'] !== 'text') {
        return new ErrorCommand();
      }
      if (relation[4] + relation[5] === '<association' || relation[3] + relation[4] === '<association' || relation[2] + relation[3] ===
        '<association' ) {
        return this.sequenceUnit(relationType, lex, relation[4] + relation[5]);
      }
      if (relation[4] + relation[5] === '<use' || relation[3] + relation[4] === '<use' || relation[2] + relation[3] === '<use' ) {
        return this.sequenceUnit(relationType, lex, relation[4] + relation[5]);
      }
      if (relation[2] + relation[5] === 'association>' || relation[3] + relation[6] ? 'association>' : relation[4] + relation[7]) {
        lex.nextToken();
        return this.sequenceUnit(relationType, lex, 'association>');
      }
      if (relation[2] + relation[5] === 'use>' || relation[3] + relation[6] ? 'use>' : relation[4] + relation[7]) {
        lex.nextToken();
        return this.sequenceUnit(relationType, lex, 'use>');
      } else {
        return new ErrorCommand();
      }
    } else {
       const lexNotSemantics = new Lex(command, this.tokenMatchers, this.ignorePattern);
      for (let i = 0; i <= 3; i++) {
        lexNotSemantics.nextToken();
      }
      if (relation[2] + relation[3] === '<association' || relation[2] + relation[3] === 'association>' ||
        relation[2] + relation[3] === '<use' || relation[2] + relation[3] === 'use>') {
        return this.sequenceUnit(relationType, lexNotSemantics, relation[2] + relation[3]);
      }
      if (relation[3] + relation[4] === '<association' || relation[3] + relation[4] === 'association>' ||
        relation[3] + relation[4] === '<use' || relation[3] + relation[4] === 'use>') {
        lexNotSemantics.nextToken();
        return this.sequenceUnit(relationType, lexNotSemantics, relation[3] + relation[4]);
      }
      if (relation[4] + relation[5] === '<association' || relation[4] + relation[5] === 'association>' ||
        relation[4] + relation[5] === '<use' || relation[4] + relation[5] === 'use>') {
        lexNotSemantics.nextToken();
        lexNotSemantics.nextToken();
        return this.sequenceUnit(relationType, lexNotSemantics, relation[4] + relation[5]);
      } else {
        return new ErrorCommand();
      }
    }
  }

  private analyzeCommandRelationInherit(command: string, lex): Command {
    const point = lex.nextToken();
    if (point['name'] === ':') {
      const semantics = lex.nextToken();
      this.semantics = semantics['lexeme'];
      if (semantics['name'] !== 'text') {
        return new error();
      }
      const lexSemantics = new Lex(command, this.tokenMatchers, this.ignorePattern);
      let token;
      const relation = [];
      for (let i = 0; i <= 5; i++) {
        token = lexSemantics.nextToken();
        relation.push(token['name']);
      }
      if (relation[2] + relation[5] === 'inherit>') {
        return this.sequenceUnit(TypeRelation.INHERIT, lexSemantics, 'inherit>');
      }
      if (relation[2] + relation[3] === '<inherit') {
        return this.sequenceUnit(TypeRelation.INHERIT, lex, '<inherit');
      }
    } else {
      const lexNotSemantics = new Lex(command, this.tokenMatchers, this.ignorePattern);
      let token;
      const relation = [];
      for (let i = 0; i <= 3; i++) {
        token = lexNotSemantics.nextToken();
        relation.push(token['name']);
      }
      if (relation[2] + relation[3] ? '<inherit' : 'inherit>') {
        return this.sequenceUnit(TypeRelation.INHERIT, lexNotSemantics, relation[2] + relation[3]);
      }
    }
  }

  private sequenceUnit(relationType: TypeRelation, lex, relation: string, cardinalLowerUnit?: string): Command {
    const name = lex.nextToken();
    if (name['name'] !== 'text') {
      return new error();
    }
    const sharp = lex.nextToken();
    if (sharp['name'] !== '#') {
      return new error();
    }
    const number = lex.nextToken();
    this.codeLowerUnit = number['lexeme'];
    if (number['name'] !== 'code') {
      return new error();
    }
    const token = lex.nextToken();
    if (token === undefined) {
      if (relation === '<inherit' || relation === '<compose' || relation === '<association' || relation === '<use') {
        return this.createRelation(relationType, this.codeTopUnit, this.codeLowerUnit, this.cardinalTopUnit, cardinalLowerUnit);
      }
      if (relation ? 'inherit>' : 'compose>') {
        return this.createRelation(relationType, this.codeLowerUnit, this.codeTopUnit, this.cardinalTopUnit, cardinalLowerUnit);
      }
      if (relation ? 'association>' : 'use>') {
        return this.createRelation(relationType, this.codeLowerUnit, this.codeTopUnit, cardinalLowerUnit, this.cardinalTopUnit);
      } else {
        return new error();
      }
    } else if (token['name'] === 'cardinal') {
      cardinalLowerUnit = token['lexeme'].split(':');
      const point = lex.nextToken();
      if (point === undefined) {
        if (relation === 'compose>') {
          return this.createRelation(relationType, this.codeLowerUnit, this.codeTopUnit, this.cardinalTopUnit, cardinalLowerUnit[1]);
        }
        if (relation === '<association' || relation === '<use') {
          return this.createRelation(relationType, this.codeTopUnit, this.codeLowerUnit, this.cardinalTopUnit, cardinalLowerUnit[1]);
        }
        if (relation === 'association>' || relation === 'use>') {
          return this.createRelation(relationType, this.codeLowerUnit, this.codeTopUnit, cardinalLowerUnit[1], this.cardinalTopUnit);
        }
      } else if (point['name'] === ',') {
        if (relation === 'compose>' || relation === '<association' || relation === 'association>'
          || relation === '<use' || relation === 'use>') {
         return this.createMoreRelations(lex, relation, relationType, cardinalLowerUnit[1]);
        }
      }
    } else if (token['name'] === ':') {
      const cardinal = lex.nextToken();
      if (cardinal['name'] === 'code' || cardinal['name'] === '+' || cardinal['name'] === '*') {
        const point = lex.nextToken();
        if (point === undefined) {
          if (relation === 'compose>') {
            return this.createRelation(relationType, this.codeLowerUnit, this.codeTopUnit, this.cardinalTopUnit, cardinal['lexeme']);
          }
          if (relation === '<association' || relation === '<use') {
            return this.createRelation(relationType, this.codeTopUnit, this.codeLowerUnit, this.cardinalTopUnit, cardinal['lexeme']);
          }
          if (relation === 'association>' || relation === 'use>') {
            return this.createRelation(relationType, this.codeLowerUnit, this.codeTopUnit, cardinal['lexeme'], this.cardinalTopUnit);
          } else {
            return new error();
          }
        } else if (point['name'] === ',') {
          if (relation === 'compose>') {
           return this.createMoreRelations(lex, relation, relationType);
          } else if (relation === '<association' || relation === 'association>' || relation === '<use' || relation === 'use>') {
            return this.createMoreRelations(lex, relation, relationType);
          } else {
            return new error();
          }
        } else {
          return new error();
        }
      } else {
        return new error();
      }
    } else if (token['name'] === ',') {
      if (relation ? '<inherit' : 'inherit>' || relation ? '<compose' : 'compose>' || relation ? '<association' : 'association>' ||
      relation ? '<use' : 'use>') {
      //  return this.createMoreRelations(lex, relation, relationType, cardinalLowerUnit);
      }
    } else {
      return new error();
    }
  }

  private createMoreRelations(lex, relation: string, relationType: TypeRelation, cardinalLowerUnit?: string): Command {
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
    cardinalsLowerUnit.unshift(cardinalLowerUnit);

    const commands: Command[] = [];
    for (let j = 0; j < idLowerUnits.length; j++) {
      if (relation === '<inherit' || relation === '<compose') {
        commands.push(this.createRelation(relationType, this.codeTopUnit, idLowerUnits[j], this.cardinalTopUnit, cardinalLowerUnit));
      }
      if (relation === 'inherit>' || relation === 'compose>') {
        commands.push(this.createRelation(relationType, idLowerUnits[j], this.codeTopUnit, this.cardinalTopUnit, cardinalsLowerUnit[j]));
      }
      if (relation === '<association' || relation === '<use') {
        commands.push(this.createRelation(relationType, this.codeTopUnit, idLowerUnits[j], this.cardinalTopUnit, cardinalsLowerUnit[j]));
      }
      if (relation === 'association>' || relation === 'use>') {
        commands.push(this.createRelation(relationType, idLowerUnits[j], this.codeTopUnit, cardinalsLowerUnit[j], this.cardinalTopUnit));
        return
      }
    }
    /*for (const command of commands) {
      console.log(command);
     return command.execute();
    }*/
  }

  private createRelation(relations: TypeRelation, codeTopUnit: number, idLowerUnit: number, cardinalTopUnit: string,
                         cardinalLowerUnit: string): Command {
    return new AddRelationCommand(relations, codeTopUnit, idLowerUnit, this.semantics, cardinalTopUnit, cardinalLowerUnit);
  }
}
