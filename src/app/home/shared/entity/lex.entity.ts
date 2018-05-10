import {error} from 'util';
import * as Lex from 'lexical-parser';
import {UnitDeleteEntity} from './unit-delete.entity';
import {Unit} from './unit.entity';
import {UnitService} from '../services/unit.service';
import {MatSnackBar} from '@angular/material';

export class LexEntity {

  tokenMatchers = [
    'new', '#', '~', '<', 'inherit', ':', '>', 'relation',
    'asociation', 'use', 'compose',
    ['id', /[0-9]+/],
    ['text', /[a-zA-Z][a-zA-Z0-9]*/],
  ];
  ignorePattern = '[\n\s \t]+';

  unitService: any;
  snackBar: any;

  constructor(unitService: UnitService, snackBar: MatSnackBar) {
    this.unitService = unitService;
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
      const deleteUnit = new UnitDeleteEntity(this.unitService, this.snackBar);
      deleteUnit.deletes(id['lexeme']);
    } else {
      if (relation['name'] === 'relation') {
        this.analyzeCommandDeleteRelation();
      }
    }
  }

  analyzeCommandDeleteRelation() {
    console.log('Delete Relation falta!');
    /*
    * ~X#n relation X#n, X#n, ...
      ~X#n relation:semantica1 X#n, X#n, ...
    */
  }

  analyzeCommandUpdate(id: object, unit: object) {
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
        this.analyzeCommandUpdate(id, name);
      } else if (token['name'] === '<') {
        this.analyzeCommandRelationInherit(command, id);
      }
    } else {
      return error();
    }
  }

 /* analyzeCommandRelation(commandRelation: string, unit: object) {
    const sharp = commandRelation.split('#');
    commandRelation = sharp.pop();
    const lex = new Lex(commandRelation, this.tokenMatchers, this.ignorePattern);
    const id = lex.nextToken();
    if (id['name'] !== 'id') {
      return error();
    }
    const token = lex.nextToken();
    if (token['name'] === ':') {
      this.analyzeCommandUpdate(id, unit);
    } else if (token['name'] === '<') {
      // return analyzeCommandRelationInheritFatherToSon(id);
    } else if (token['name'] === 'inherit') {

    } else {
      return error();
    }
    const relation = lex.nextToken();
    if (relation['name'] !== 'inherit' && relation['name'] !== 'compose' &&
      relation['name'] !== 'asociation' && relation['name'] !== 'use') {
      return error();
    }*/

   analyzeCommandRelationInherit(command: string, idUnit: object) {
     const lex = new Lex(command, this.tokenMatchers, this.ignorePattern);
     for (let i = 0; i < 2; i++) {
       lex.nextToken();
     }
     console.log(lex.nextToken().name);
     const inherit = lex.nextToken();
     if (inherit['name'] !== 'inherit') {
       return error();
     }
     const point = lex.nextToken();
     if (point['name'] === ':') {
       const semantic = lex.nextToken();
       if (semantic['name'] !== 'text') {
         return error();
       }
       const name = lex.nextToken();
       if (name['name'] !== 'text') {
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
       const token = lex.nextToken();
       console.log(token);
       if (token === undefined) {
         console.log('exito');
         /*
         * const unit = new Unit(name['lexeme']);
      unit.saveUnit(this.unitService, this.snackBar);
         * */

       }
     } else {

     }

     /*const lex = new Lex(commandRelation, tokenMatchers, ignorePattern);
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
     }*/
   }
}
