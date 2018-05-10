import {error} from 'util';
import * as Lex from 'lexical-parser';
import {UnitDeleteEntity} from './unit-delete.entity';
import {Unit} from './unit.entity';
import {UnitService} from '../services/unit.service';
import {MatSnackBar} from '@angular/material';

export class LexEntity {

  command: string;

  constructor(command, unitService: UnitService, snackBar: MatSnackBar) {
    this.command = command;
    this.analyzeCommand(command, unitService, snackBar);
  }

  analyzeCommand(command: string, unitService: UnitService, snackBar: MatSnackBar) {

    const tokenMatchers = [
      'new', '#', '~', '<', 'inherit', ':', '>', 'relation',
      'asociation', 'use', 'compose',
      ['id', /[0-9]+/],
      ['text', /[a-zA-Z][a-zA-Z0-9]*/],
    ];
    const ignorePattern = '[\n\s \t]+';

    function analyze() {
      const lex = new Lex(command, tokenMatchers, ignorePattern);
      const token = lex.nextToken();
      switch (token['name']) {
        case '~':
          const val = command.split('~');
          command = val.pop();
          return analyzeCommandDeleteUnit(command);
        case 'text':
          const text = command.split(token['lexeme']);
          command = text.pop();
          console.log('Caso de crear');
          return analyzeCommandCreateUnit(command, token);
        default:
          return error();
      }
    }

    function analyzeCommandDeleteUnit(commandDelete: string) {
      const lex = new Lex(commandDelete, tokenMatchers, ignorePattern);
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
        return new UnitDeleteEntity(unitService, snackBar).deletes(id['lexeme']);
      } else {
        if (relation['name'] === 'relation') {
          return analyzeCommandDeleteRelation();
        }
      }
    }

    function analyzeCommandDeleteRelation() {
      console.log('analyzeCommandDeleteRelation');
    }

    function analyzeCommandCreateUnit(commandCreate: string, name: object) {
      const lex = new Lex(commandCreate, tokenMatchers, ignorePattern);
      const sharp = lex.nextToken();
      if (sharp['name'] !== '#') {
        console.log('Error');
        return error();
      }
      const id = lex.nextToken();
      if (id['name'] === 'new') {
        const unit =  new Unit(name['lexeme']);
        return unit.saveUnit(unitService, snackBar);
      } else if (id['name'] === 'id') {
        const token = lex.nextToken();
        if (token['name'] === ':') {
          return analyzeCommandUpdate(id, name);
        } else if (token['name'] === '<') {
          // sdf
        }
      } else {
        console.log('Error');
        return error();
      }
    }

    function analyzeCommandRelation(commandRelation: string, unit: object) {
      const sharp = commandRelation.split('#');
      commandRelation = sharp.pop();
      const lex = new Lex(commandRelation, tokenMatchers, ignorePattern);
      const id = lex.nextToken();
      if (id['name'] !== 'id') {
        return error();
      }
      const token = lex.nextToken();
      if (token['name'] === ':') {
        return analyzeCommandUpdate(id, unit);
      } else if (token['name'] === '<') {
       // return analyzeCommandRelationInheritFatherToSon(id);
      } else if (token['name'] === 'inherit') {

      } else {
        return error();
      }
      /*const relation = lex.nextToken();
      if (relation['name'] !== 'inherit' && relation['name'] !== 'compose' &&
        relation['name'] !== 'asociation' && relation['name'] !== 'use') {
        return error();
      }*/
    }

   /* function analyzeCommandRelationInheritFatherToSon(id: any) {
      console.log(id);
      const lex = new Lex(commandRelation, tokenMatchers, ignorePattern);
      const relation = lex.nextToken();
      if (relation['name'] !== 'inherit') {
        return error();
      }
      const point = lex.nextToken();
      if (point['name'] === ':') {
        const semantic = lex.nextToken();
        if (semantic['name'] !== 'text') {
          return error();
        } else {
          console.log(/// bien);
        }
      }
    }*/

    function analyzeCommandUpdate(id: object, unit: object) {
      console.log('Update');
      console.log(unit['lexeme']);
      console.log(id['lexeme']);
    }

    return analyze();
  }
}
