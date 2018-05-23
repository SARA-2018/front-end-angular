import * as Lex from 'lexical-parser';
import { TypeRelation } from './type-relation.enum';
import { AddUnitCommand } from './addUnitCommand.model';
import { Command } from './command.model';
import { ErrorCommand } from './errorCommand.model';
import {DeleteUnitCommand} from './deleteUnitCommand.model';
import {AddRelationCommand} from './addRelationCommand.model';
import {error} from 'util';


export class Lexical {

  readonly tokenMatchers = [
    'new', '#', '~', '<', 'inherit', ':', '>', 'relation',
    'association', 'use', 'compose', ',', '*', '+',
    ['code', /[0-9]+/],
    ['text', /[a-záéíóúA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ][a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ0-9]*/],
    ['cardinal', /\W.[n|m*+.(n|m*+)][0-9.(nm*+0-9)]+/],
  ];
  readonly ignorePattern = '[\n\s \t]+';

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
    const idTopUnit = lex.nextToken();
    if (idTopUnit['name'] === 'new') {
      return new AddUnitCommand(name['lexeme']);
    }
    if (idTopUnit['name'] === 'code') {
      return this.analyzeCommandUpdateUnit(command, lex, idTopUnit);
    } else {
      return new ErrorCommand();
    }
  }

  private analyzeCommandUpdateUnit(command: string, lex, idTopUnit): Command {
    const token = lex.nextToken();
    if (token['name'] === ':') {
      const cardinal = lex.nextToken();
      if (cardinal === undefined) {
        // Update Unit;
      }
      if (cardinal['name'] === 'code' || cardinal['name'] === '+' || cardinal['name'] === '*') {
        return this.analyzeCommandRelationByOperatorCardinal(command, lex, idTopUnit, cardinal);
      } else {
        return new ErrorCommand();
      }
    }
    if (token['name'] === 'cardinal') {
      return this.analyzeCommandRelationByCardinal(command, lex, token, idTopUnit);
    }
    if (token['name'] === '<') {
      return this.analyzeCommandRelationByNotCardinal(command, idTopUnit, lex);
    }
    if (token['name'] === 'inherit') {
      return this.analyzeCommandRelationInherit(command, idTopUnit, lex);
    }
    if (token['name'] === 'compose') {
      return this.analyzeCommandRelationCompose(command, idTopUnit);
    }
    if (token['name'] === 'association') {
      return this.analyzeCommandRelationAssociationOrUse(command, idTopUnit, lex, TypeRelation.ASSOCIATION);
    }
    if (token['name'] === 'use') {
      return this.analyzeCommandRelationAssociationOrUse(command, idTopUnit, lex, TypeRelation.USE);
    } else {
      return new ErrorCommand();
    }
  }

  private analyzeCommandRelationByOperatorCardinal(command: string, lex, idTopUnit, cardinalTopUnit): Command {
    const more = lex.nextToken();
    if (more['name'] === '<') {
      const relation = lex.nextToken();
      if (relation['name'] === 'compose') {
        return this.analyzeCommandRelationCompose(command, idTopUnit, cardinalTopUnit['lexeme']);
      }
      if (relation['name'] === 'association') {
        return this.analyzeCommandRelationAssociationOrUse(command, idTopUnit, lex, TypeRelation.ASSOCIATION, cardinalTopUnit['lexeme']);
      }
      if (relation['name'] === 'use') {
        return this.analyzeCommandRelationAssociationOrUse(command, idTopUnit, lex, TypeRelation.USE, cardinalTopUnit['lexeme']);
      } else {
        return new ErrorCommand();
      }
    }
    if (more['name'] === 'association') {
      return this.analyzeCommandRelationAssociationOrUse(command, idTopUnit, lex, TypeRelation.ASSOCIATION, cardinalTopUnit['lexeme']);
    }
    if (more['name'] === 'use') {
      return this.analyzeCommandRelationAssociationOrUse(command, idTopUnit, lex, TypeRelation.USE, cardinalTopUnit['lexeme']);
    } else {
      return new ErrorCommand();
    }
  }

  private analyzeCommandRelationByCardinal(command: string, lex, token, idTopUnit): Command {
    const cardinalTopUnit = token['lexeme'].split(':');
    const more = lex.nextToken();
    if (more['name'] === '<') {
      const relation = lex.nextToken();
      if (relation['name'] === 'compose') {
        return this.analyzeCommandRelationCompose(command, idTopUnit, cardinalTopUnit[1]);
      }
      if (relation['name'] === 'association') {
        return this.analyzeCommandRelationAssociationOrUse(command, idTopUnit, lex, TypeRelation.ASSOCIATION, cardinalTopUnit[1]);
      }
      if (relation['name'] === 'use') {
        return this.analyzeCommandRelationAssociationOrUse(command, idTopUnit, lex, TypeRelation.USE, cardinalTopUnit[1]);
      }
    }
    if (more['name'] === 'association') {
      return this.analyzeCommandRelationAssociationOrUse(command, idTopUnit, lex, TypeRelation.ASSOCIATION, cardinalTopUnit[1]);
    }
    if (more['name'] === 'use') {
      return this.analyzeCommandRelationAssociationOrUse(command, idTopUnit, lex, TypeRelation.USE, cardinalTopUnit[1]);
    }
  }

  private analyzeCommandRelationByNotCardinal(command: string, idTopUnit, lex): Command {
    const relation = lex.nextToken();
    if (relation['name'] === 'inherit') {
      return this.analyzeCommandRelationInherit(command, idTopUnit, lex);
    }
    if (relation['name'] === 'compose') {
      return this.analyzeCommandRelationCompose(command, idTopUnit);
    }
    if (relation['name'] === 'association') {
      return this.analyzeCommandRelationAssociationOrUse(command, idTopUnit, lex, TypeRelation.ASSOCIATION);
    }
    if (relation['name'] === 'use') {
      return this.analyzeCommandRelationAssociationOrUse(command, idTopUnit, lex, TypeRelation.USE);
    }
    return new ErrorCommand();
  }

  private analyzeCommandRelationCompose(command: string, idTopUnit: object, cardinalTopUnit?: string): Command {
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
      return this.sequenceUnit(TypeRelation.COMPOSE, lexCardinal, idTopUnit, '<compose', undefined, cardinalTopUnit, undefined);
    }
    if (relation[3] + relation[4] === '<compose') {
      lexByOperator.nextToken();
      return this.sequenceUnit(TypeRelation.COMPOSE, lexByOperator, idTopUnit, '<compose', undefined, cardinalTopUnit, undefined);
    }
    if (relation[2] + relation[3] === '<compose' || relation[2] + relation[3] === 'compose>') {
      return this.sequenceUnit(TypeRelation.COMPOSE, lexByOperator, idTopUnit, relation[2] + relation[3]);
    } else {
      return new ErrorCommand();
    }
  }

  private analyzeCommandRelationAssociationOrUse(command: string, idTopUnit: object, lex, relationType: TypeRelation,
                                                cardinalTopUnit?: string, cardinalLowerUnit?: string): Command {
    const lexSemantics = new Lex(command, this.tokenMatchers, this.ignorePattern);
    let token;
    const relation = [];
    for (let i = 0; i <= 7; i++) {
      token = lexSemantics.nextToken();
      if (token !== undefined) {
        relation.push(token['name']);
      }
    }
    console.log(relation)
    const point = lex.nextToken();
    if (point['name'] === ':') {
      const semantics = lex.nextToken();
      if (semantics['name'] !== 'text') {
        return new ErrorCommand();
      }
      if (relation[4] + relation[5] === '<association' || relation[4] + relation[5] === '<use') {
        return this.sequenceUnit(relationType, lex, idTopUnit, relation[4] + relation[5], semantics['lexeme'], cardinalTopUnit, cardinalLowerUnit);
      }
      if (relation[3] + relation[4] === '<association' || relation[3] + relation[4] === '<use') {
        return this.sequenceUnit(relationType, lex, idTopUnit, relation[3] + relation[4], semantics['lexeme'], cardinalTopUnit, cardinalLowerUnit);
      }
      if (relation[2] + relation[3] === '<association' || relation[2] + relation[3] === '<use') {
        return this.sequenceUnit(relationType, lex, idTopUnit, relation[2] + relation[3], semantics['lexeme'], undefined, cardinalLowerUnit);
      }
      if (relation[2] + relation[5] === 'association>' || relation[3] + relation[6] === 'association>') {
        lex.nextToken();
        return this.sequenceUnit(relationType, lex, idTopUnit, 'association>', semantics['lexeme'], cardinalTopUnit, cardinalLowerUnit);
      }
      if (relation[2] + relation[5] === 'use>' || relation[3] + relation[6] === 'use>') {
        lex.nextToken();
        return this.sequenceUnit(relationType, lex, idTopUnit, 'use>', semantics['lexeme'], cardinalTopUnit, cardinalLowerUnit);
      } else {
        return error();
      }
    } else {
       const lexNotSemantics = new Lex(command, this.tokenMatchers, this.ignorePattern);
      for (let i = 0; i <= 3; i++) {
        lexNotSemantics.nextToken();
      }
      if (relation[2] + relation[3] === '<association' || relation[2] + relation[3] === 'association>' ||
        relation[2] + relation[3] === '<use' || relation[2] + relation[3] === 'use>') {
        return this.sequenceUnit(relationType, lexNotSemantics, idTopUnit, relation[2] + relation[3], undefined,
          cardinalTopUnit, cardinalLowerUnit);
      }
      if (relation[3] + relation[4] === '<association' || relation[3] + relation[4] === 'association>' ||
        relation[3] + relation[4] === '<use' || relation[3] + relation[4] === 'use>') {
        lexNotSemantics.nextToken();
        return this.sequenceUnit(relationType, lexNotSemantics, idTopUnit, relation[3] + relation[4], undefined,
          cardinalTopUnit, cardinalLowerUnit);
      }
      if (relation[4] + relation[5] === '<association' || relation[4] + relation[5] === 'association>' ||
        relation[4] + relation[5] === '<use' || relation[4] + relation[5] === 'use>') {
        lexNotSemantics.nextToken();
        lexNotSemantics.nextToken();
        return this.sequenceUnit(relationType, lexNotSemantics, idTopUnit, relation[4] + relation[5], undefined,
          cardinalTopUnit, cardinalLowerUnit);
      }
      if (relation[4] + relation[7] === 'association>' || relation[4] + relation[7] === 'use>') {
        lex.nextToken();
        return this.sequenceUnit(relationType, lex, idTopUnit, relation[4] + relation[7], point['lexeme'],
          cardinalTopUnit, cardinalLowerUnit);
      } else {
        return new error();
      }
    }
  }

  private analyzeCommandRelationInherit(command: string, idTopUnit: object, lex): Command {
    const point = lex.nextToken();
    if (point['name'] === ':') {
      const semantics = lex.nextToken();
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
        return this.sequenceUnit(TypeRelation.INHERIT, lexSemantics, idTopUnit, 'inherit>', semantics['lexeme']);
      }
      if (relation[2] + relation[3] === '<inherit') {
        return this.sequenceUnit(TypeRelation.INHERIT, lex, idTopUnit, '<inherit', semantics['lexeme']);
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
        return this.sequenceUnit(TypeRelation.INHERIT, lexNotSemantics, idTopUnit, relation[2] + relation[3]);
      }
    }
  }

  private sequenceUnit(relationType: TypeRelation, lex, idTopUnit, relation: string, semantics?: string, cardinalTopUnit?: string,
                       cardinalLowerUnit?: string): Command {
    const name = lex.nextToken();
    if (name['name'] !== 'text') {
      return new error();
    }
    const sharp = lex.nextToken();
    if (sharp['name'] !== '#') {
      return new error();
    }
    const idLowerUnit = lex.nextToken();
    if (idLowerUnit['name'] !== 'code') {
      return new error();
    }
    const token = lex.nextToken();
    if (token === undefined) {
      if (relation ? '<inherit' : '<compose' || relation ? '<association' : '<use') {
        return this.createRelation(relationType, idTopUnit['lexeme'], idLowerUnit['lexeme'], semantics, cardinalTopUnit, cardinalLowerUnit);
      }
      if (relation ? 'inherit>' : 'compose>') {
        return this.createRelation(relationType, idLowerUnit['lexeme'], idTopUnit['lexeme'], semantics, cardinalTopUnit, cardinalLowerUnit);
      }
      if (relation ? 'association>' : 'use>') {
        return this.createRelation(relationType, idLowerUnit['lexeme'], idTopUnit['lexeme'], semantics, cardinalLowerUnit, cardinalTopUnit);
      } else {
        return new error();
      }
    } else if (token['name'] === 'cardinal') {
      cardinalLowerUnit = token['lexeme'].split(':');
      const point = lex.nextToken();
      if (point === undefined) {
        if (relation === 'compose>') {
          return this.createRelation(relationType, idLowerUnit['lexeme'], idTopUnit['lexeme'], semantics, cardinalTopUnit, cardinalLowerUnit[1]);
        }
        if (relation === '<association' || relation === '<use') {
          return this.createRelation(relationType, idTopUnit['lexeme'],  idLowerUnit['lexeme'], semantics, cardinalTopUnit, cardinalLowerUnit[1]);
        }
        if (relation === 'association>' || relation === 'use>') {
          return this.createRelation(relationType, idLowerUnit['lexeme'], idTopUnit['lexeme'], semantics, cardinalLowerUnit[1], cardinalTopUnit);
        }
      } else if (point['name'] === ',') {
        if (relation === 'compose>' || relation === '<association' || relation === 'association>'
          || relation === '<use' || relation === 'use>') {
         return this.createMoreRelations(lex, idTopUnit, idLowerUnit, relation, relationType, semantics, cardinalTopUnit, cardinalLowerUnit[1]);
        }
      }
    } else if (token['name'] === ':') {
      const cardinal = lex.nextToken();
      if (cardinal['name'] === 'code' || cardinal['name'] === '+' || cardinal['name'] === '*') {
        const point = lex.nextToken();
        if (point === undefined) {
          if (relation === 'compose>') {
            return this.createRelation(relationType, idLowerUnit['lexeme'], idTopUnit['lexeme'], semantics, cardinalTopUnit, cardinal['lexeme']);
          }
          if (relation === '<association' || relation === '<use') {
            return this.createRelation(relationType, idTopUnit['lexeme'], idLowerUnit['lexeme'], semantics, cardinalTopUnit, cardinal['lexeme']);
          }
          if (relation === 'association>' || relation === 'use>') {
            return this.createRelation(relationType, idLowerUnit['lexeme'], idTopUnit['lexeme'], semantics, cardinal['lexeme'], cardinalTopUnit);
          } else {
            return new error();
          }
        } else if (point['name'] === ',') {
          if (relation === 'compose>') {
           return this.createMoreRelations(lex, idTopUnit, idLowerUnit, relation, relationType, semantics, undefined, cardinal['lexeme']);
          } else if (relation === '<association' || relation === 'association>' || relation === '<use' || relation === 'use>') {
            return this.createMoreRelations(lex, idTopUnit, idLowerUnit, relation, relationType, semantics, cardinalTopUnit, cardinal['lexeme']);
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
        return this.createMoreRelations(lex, idTopUnit, idLowerUnit, relation, relationType, semantics, cardinalTopUnit, cardinalLowerUnit);
      }
    } else {
      return new error();
    }
  }

  private createMoreRelations(lex, idTopUnit, idLowerUnit, relation: string, relationType: TypeRelation, semantics: string,
                              cardinalTopUnit: string, cardinalLowerUnit: string): Command {
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
    idLowerUnits.unshift(idLowerUnit['lexeme']);
    cardinalsLowerUnit.unshift(cardinalLowerUnit);
    console.log(cardinalsLowerUnit)
    console.log(idLowerUnits)


    for (let j = 0; j < idLowerUnits.length; j++) {
      console.log(idLowerUnits[j])
      if (relation === '<inherit' || relation === '<compose') {
        return  this.createRelation(relationType, idTopUnit['lexeme'], idLowerUnits[j], semantics, cardinalTopUnit, cardinalLowerUnit);
      }
      if (relation === 'inherit>' || relation === 'compose>') {
        return this.createRelation(relationType, idLowerUnits[j], idTopUnit['lexeme'], semantics, cardinalTopUnit, cardinalsLowerUnit[j]);
      }
      if (relation === '<association' || relation === '<use') {
        return this.createRelation(relationType, idTopUnit['lexeme'], idLowerUnits[j], semantics, cardinalTopUnit, cardinalsLowerUnit[j]);
      }
      if (relation === 'association>' || relation === 'use>') {
        return this.createRelation(relationType,  idLowerUnits[j], idTopUnit['lexeme'], semantics, cardinalsLowerUnit[j], cardinalTopUnit);
      } else {
        return new ErrorCommand();
      }
    }
  }

  private createRelation(relations: TypeRelation, idTopUnit: number, idLowerUnit: number, semantics: string,
                         cardinalTopUnit: string, cardinalLowerUnit: string): Command {
    console.log(relations, idTopUnit, idLowerUnit, semantics, cardinalTopUnit, cardinalLowerUnit);
    return new AddRelationCommand(relations, idTopUnit, idLowerUnit, semantics, cardinalTopUnit, cardinalLowerUnit);
  }
}
