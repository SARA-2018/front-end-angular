import {error} from 'util';
import * as Lex from 'lexical-parser';
import {UnitDelete} from './unit-delete.model';
import {Unit} from './unit.model';
import {UnitService} from '../services/unit.service';
import {MatSnackBar} from '@angular/material';
import {RelationOutput} from './relation-output.model';
import {TypeRelation} from './type-relation.enum';
import {RelationService} from '../services/relation.service';

export class Lexical {

  readonly tokenMatchers = [
    'new', '#', '~', '<', 'inherit', ':', '>', 'relation',
    'asociation', 'use', 'compose', ',', '*', '+',
    ['code', /[0-9]+/],
    ['text', /[a-záéíóúA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ][a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ0-9]*/],
    ['cardinal', /\W.[n|m*+.(n|m*+)][0-9.(nm*+0-9)]+/],
  ];
  readonly ignorePattern = '[\n\s \t]+';

  unitService: UnitService;
  snackBar: MatSnackBar;
  relationService: RelationService;

  constructor(unitService: UnitService, relationService: RelationService, snackBar: MatSnackBar) {
    this.unitService = unitService;
    this.relationService = relationService;
    this.snackBar = snackBar;
  }

  analyzeCommand(command: string) {
    const lex = new Lex(command, this.tokenMatchers, this.ignorePattern);
    const token = lex.nextToken();
    switch (token['name']) {
      case '~':
        const val = command.split('~');
        command = val.pop();
        this.analyzeCommandDeleteUnit(command);
        break;
      case 'text':
        const text = command.split(token['lexeme']);
        command = text.pop();
        this.analyzeCommandCreateUnit(command, token);
        break;
      default:
        return error();
    }
  }

  analyzeCommandDeleteUnit(commandDelete: string) {
    const lex = new Lex(commandDelete, this.tokenMatchers, this.ignorePattern);
    const unit = lex.nextToken();
    if (unit['name'] !== 'text') {
      return error();
    }
    const sharp = lex.nextToken();
    if (sharp['name'] !== '#') {
      return error();
    }
    const code = lex.nextToken();
    if (code['name'] !== 'code') {
      return error();
    }
    const relation = lex.nextToken();
    if (relation === undefined) {
      const deleteUnit = new UnitDelete(this.unitService, this.snackBar);
      deleteUnit.deletes(code['lexeme']);
    } else {
      if (relation['name'] === 'relation') {
        this.analyzeCommandDeleteRelation();
      }
    }
  }

  analyzeCommandDeleteRelation() {
    console.log('Delete RelationOutput falta!');
    /*
    * ~X#n relation X#n, X#n, ...
      ~X#n relation:semantica1 X#n, X#n, ...
    */
  }

  analyzeCommandUpdateUnit(code: object, unit: object) {
    console.log('Update');
    console.log(unit);
    console.log(code['lexeme']);
  }

  analyzeCommandCreateUnit(command: string, name: object) {
    const lex = new Lex(command, this.tokenMatchers, this.ignorePattern);
    const sharp = lex.nextToken();
    if (sharp['name'] !== '#') {
      return error();
    }
    const idTopUnit = lex.nextToken();
    if (idTopUnit['name'] === 'new') {
      const unit = new Unit(name['lexeme']);
      unit.saveUnit(this.unitService, this.snackBar);
    } else if (idTopUnit['name'] === 'code') {
      const token = lex.nextToken();
      if (token['name'] === ':') {
        const cardinal = lex.nextToken();
        if (cardinal === undefined) {
          this.analyzeCommandUpdateUnit(idTopUnit, name);
        } else if (cardinal['name'] === 'code' || cardinal['name'] === '+' || cardinal['name'] === '*') {
          const more = lex.nextToken();
          const relation = lex.nextToken();
          if (more['name'] === '<' ) {
            if (relation['name'] === 'compose') {
              this.analyzeCommandRelationCompose(command, idTopUnit, cardinal['lexeme']);
            } else if (relation['name'] === 'asociation') {
              this.analyzeCommandRelationAsociation(command, idTopUnit, cardinal['lexeme']);
            }
          } else if (more['name'] === 'asociation') {
            this.analyzeCommandRelationAsociation(command, idTopUnit, cardinal['lexeme']);
          }
        } else {
          return error();
        }
      } else if ( token['name'] === 'cardinal') {
        const cardinal = token['lexeme'].split(':');
        this.analyzeCommandRelationCompose(command, idTopUnit, cardinal[1]);
      } else if (token['name'] === '<') {
        const relation = lex.nextToken();
        if (relation['name'] === 'inherit') {
          this.analyzeCommandRelationInherit(command, idTopUnit, lex);
        } else if (relation['name'] === 'compose') {
          this.analyzeCommandRelationCompose(command, idTopUnit);
        } else {
          return error();
        }
      } else if (token['name'] === 'inherit') {
        this.analyzeCommandRelationInherit(command, idTopUnit, lex);
      } else if (token['name'] === 'compose') {
        this.analyzeCommandRelationCompose(command, idTopUnit);
      } else {
        return error();
      }
    } else {
      return error();
    }
  }

  private analyzeCommandRelationCompose(command: string, idTopUnit: object, cardinal?: string) {
    const lexAux = new Lex(command, this.tokenMatchers, this.ignorePattern);
    for (let i = 0; i <= 3; i++) {
      lexAux.nextToken();
    }
    let token;
    const operator = [];
    const lex = new Lex(command, this.tokenMatchers, this.ignorePattern);
    for (let i = 0; i <= 5; i++) {
      token = lex.nextToken();
      operator.push(token['name']);
    }
    if (operator[4] + operator[5] === '<compose') {
      this.sequenceUnit(TypeRelation.COMPOSE, lex, idTopUnit, '<compose', undefined, cardinal);
    } else if (operator[3] + operator [4] === '<compose') {
      lexAux.nextToken();
      this.sequenceUnit(TypeRelation.COMPOSE, lexAux, idTopUnit, '<compose', undefined, cardinal);
    } else if (operator[2] + operator[3] === '<compose' || operator[2] + operator[3] === 'compose>') {
      this.sequenceUnit(TypeRelation.COMPOSE, lexAux, idTopUnit, operator[2] + operator[3]);
    } else {
      return error();
    }
  }

  private analyzeCommandRelationAsociation(command: string, idTopUnit: object, cardinal?: string) {
console.log('sdffdsdsf');
  }
  private analyzeCommandRelationInherit(command: string, idTopUnit: object, lex) {
    const point = lex.nextToken();
    if (point['name'] === ':') {
      const semantics = lex.nextToken();
      if (semantics['name'] !== 'text') {
        return error();
      }
      const lexAux = new Lex(command, this.tokenMatchers, this.ignorePattern);
      let token;
      const operator = [];
      for (let i = 0; i <= 5; i++) {
        token = lexAux.nextToken();
        operator.push(token['name']);
      }
      if (operator[2] + operator[5] === 'inherit>') {
        this.sequenceUnit(TypeRelation.INHERIT, lexAux, idTopUnit, 'inherit>', semantics['lexeme']);
      } else if (operator[2] + operator[3] === '<inherit') {
        this.sequenceUnit(TypeRelation.INHERIT, lex, idTopUnit, '<inherit', semantics['lexeme']);
      }
    } else {
      const lexAux = new Lex(command, this.tokenMatchers, this.ignorePattern);
      let token;
      const operator = [];
      for (let i = 0; i <= 3; i++) {
        token = lexAux.nextToken();
        operator.push(token['name']);
      }
      if (operator[2] + operator[3] === '<inherit' || operator[2] + operator[3] === 'inherit>') {
        this.sequenceUnit(TypeRelation.INHERIT, lexAux, idTopUnit, operator[2] + operator[3]);
      }
    }
  }

  private sequenceUnit(relation, lex, idTopUnit, operator: string, semantics?: string, cardinal?: string) {
    const name = lex.nextToken();
    if (name['name'] !== 'text') {
      return error();
    }
    const sharp = lex.nextToken();
    if (sharp['name'] !== '#') {
      return error();
    }
    const idLowerUnit = lex.nextToken();
    if (idLowerUnit['name'] !== 'code') {
      return error();
    }
    const token = lex.nextToken();

    if (token === undefined) {
      if (operator === '<inherit' || operator === '<compose') {
        this.createRelation(relation, idTopUnit['lexeme'], idLowerUnit['lexeme'], semantics, cardinal);
      } else if (operator === 'inherit>' || operator === 'compose>') {
        this.createRelation(relation, idLowerUnit['lexeme'], idTopUnit['lexeme'], semantics, cardinal);
      } else {
        return error();
      }
    } else if (token['name'] === 'cardinal') {
       cardinal = token['lexeme'].split(':');
      if (operator === 'compose>') {
        const point = lex.nextToken();
        if (point === undefined) {
          this.createRelation(relation, idLowerUnit['lexeme'], idTopUnit['lexeme'], semantics, cardinal[1]);
        } else if (point['name'] === ',') {
          this.createMoreRelations(lex, idTopUnit, idLowerUnit, operator, relation, semantics, cardinal[1]);
        }
      }
    } else if (token['name'] === ':') {
      if (operator === 'compose>') {
       cardinal = lex.nextToken();
        if (cardinal['name'] === 'code' || cardinal['name'] === '+' || cardinal['name'] === '*') {
          const point = lex.nextToken();
          if (point === undefined) {
            this.createRelation(relation, idLowerUnit['lexeme'], idTopUnit['lexeme'], semantics, cardinal['lexeme']);
          } else if (point['name'] === ',') {
            this.createMoreRelations(lex, idTopUnit, idLowerUnit, operator, relation, semantics, cardinal['lexeme']);
          }
        } else {
          return error();
        }
      } else {
        return error();
      }
    } else if (token['name'] === ',') {
      this.createMoreRelations(lex, idTopUnit, idLowerUnit, operator, relation, semantics, cardinal);
    } else {
      return error();
    }
  }

  private createMoreRelations(lex, idTopUnit, idLowerUnit, operator, relation, semantics, cardinal) {
    let codes;
    const idLowerUnits = [];
    const cardinals = [];
    do {
      codes = lex.nextToken();
      if (codes !== undefined) {
        if (codes['name'] === 'code') {
          idLowerUnits.push(codes['lexeme']);
        } else if (codes['name'] === 'cardinal') {
          const cardinalAux = codes['lexeme'].split(':');
          cardinals.push(cardinalAux[1]);
        } else if (codes['name'] === ':') {
          codes = lex.nextToken();
          if (codes['name'] === 'code' || codes['name'] === '+' || codes['name'] === '*') {
            cardinals.push(codes['lexeme']);
          }
        }
      }
    } while (codes);
    idLowerUnits.unshift(idLowerUnit['lexeme']);
    cardinals.unshift(cardinal);
    for (let j = 0; j < idLowerUnits.length; j++) {
      if (operator === '<inherit' || operator === '<compose') {
        this.createRelation(relation, idTopUnit['lexeme'], idLowerUnits[j], semantics, cardinal);
      } else if (operator === 'inherit>' || operator === 'compose>') {
        this.createRelation(relation, idLowerUnits[j], idTopUnit['lexeme'], semantics, cardinals[j]);
      } else {
        return error();
      }
    }
  }

  private createRelation(relations: TypeRelation, idTopUnit: number, idLowerUnit: number,
                         semantics: string, cardinal: string): RelationOutput {
    const relation = new RelationOutput(relations, idTopUnit, idLowerUnit, semantics, cardinal);
    relation.saveRelation(this.relationService, this.snackBar);
    return relation;
  }
}
