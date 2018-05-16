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
    ['id', /[0-9]+/],
    ['text', /[a-záéíóúA-Z][a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ0-9]*/],
    ['cardinal', /[nm*+0-1][.(0-1+*nm)]+/],
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
    const id = lex.nextToken();
    if (id['name'] !== 'id') {
      return error();
    }
    const relation = lex.nextToken();
    if (relation === undefined) {
      const deleteUnit = new UnitDelete(this.unitService, this.snackBar);
      deleteUnit.deletes(id['lexeme']);
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

  analyzeCommandUpdateUnit(id: object, unit: object) {
    console.log('Update');
    console.log(unit['lexeme']);
    console.log(id['lexeme']);
  }

  analyzeCommandCreateUnit(command: string, name: object) {
    const lex = new Lex(command, this.tokenMatchers, this.ignorePattern);
    const sharp = lex.nextToken();
    if (sharp['name'] !== '#') {
      return error();
    }
    const id = lex.nextToken();
    if (id['name'] === 'new') {
      const unit = new Unit(name['lexeme']);
      unit.saveUnit(this.unitService, this.snackBar);
    } else if (id['name'] === 'id') {
      const token = lex.nextToken();
      if (token['name'] === ':') {
        const cardinal = lex.nextToken();
        if (cardinal === undefined) {
          this.analyzeCommandUpdateUnit(id, name);
        } else {
          this.analyzeCommandRelationCompose(lex, cardinal);
        }
      } else if (token['name'] === '<') {
        const relation = lex.nextToken();
        if (relation['name'] === 'inherit') {
          this.analyzeCommandRelationInherit(lex, command, id);
        } else if (relation['name'] === 'compose') {
          this.analyzeCommandRelationCompose(lex);
        } else {
          return error();
        }
      } else if (token['name'] === 'inherit') {
        this.analyzeCommandRelationInherit(lex, command, id);
      }
    } else {
      return error();
    }
  }
  analyzeCommandRelationCompose(lex, cardinal?: object) {
    console.log(lex);
    console.log(cardinal);
  }

  analyzeCommandRelationInherit(lex, command: string, idTopUnit: object) {
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
      let operator;
      const rela = [];
      for (let i = 0; i <= 3; i++) {
        operator = lexAux.nextToken();
        rela.push(operator['name']);
      }
      console.log(rela);
      if (rela[2] + rela[3] === '<inherit') {
        this.sequenceUnit(TypeRelation.INHERIT, lexAux, idTopUnit, '<inherit');
      } else if (rela[2] + rela[3] === 'inherit>') {
        console.log(lexAux);
        this.sequenceUnit(TypeRelation.INHERIT, lexAux, idTopUnit, 'inherit>');
      }
    }
  }

  sequenceUnit(relation, lex, idTopUnit, operator: string, semantics?: string, cardinal?) {
    const name = lex.nextToken();
    if (name['name'] !== 'text') {
      return error();
    }
    const sharp = lex.nextToken();
    if (sharp['name'] !== '#') {
      return error();
    }
    const idLowerUnit = lex.nextToken();
    if (idLowerUnit['name'] !== 'id') {
      return error();
    }
    const token = lex.nextToken();
    if (token === undefined) {
      if (operator === '<inherit') {
        this.createRelationInherit(relation, idTopUnit['lexeme'], idLowerUnit['lexeme'], semantics);
      } else if (operator === 'inherit>') {
        this.createRelationInherit(relation, idLowerUnit['lexeme'], idTopUnit['lexeme'], semantics);
      }
    } else if (token['name'] === ',') {
      let ids;
      const idLowerUnits = [];
      do {
        ids = lex.nextToken();
        if (ids !== undefined) {
          if (ids['name'] === 'id') {
            idLowerUnits.push(ids['lexeme']);
          }
        }
      } while (ids);
      idLowerUnits.unshift(idLowerUnit['lexeme']);
      for (let j = 0; j < idLowerUnits.length; j++) {
        if (operator === '<inherit') {
          this.createRelationInherit(relation, idTopUnit['lexeme'], idLowerUnits[j], semantics);
        } else if (operator === 'inherit>') {
          this.createRelationInherit(relation,  idLowerUnits[j], idTopUnit['lexeme'], semantics);
        }
      }
    } else {
      return error();
    }
  }

  createRelationInherit(relations: TypeRelation, idTopUnit: number, idLowerUnit: number, semantics: string): RelationOutput {
    const relation = new RelationOutput(relations, idTopUnit, idLowerUnit, semantics);
    relation.saveRelation(this.relationService, this.snackBar);
    return relation;
  }
}
