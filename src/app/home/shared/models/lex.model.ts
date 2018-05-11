import {error} from 'util';
import * as Lex from 'lexical-parser';
import {UnitDeleteEntity} from './unit-delete.model';
import {Unit} from './unit.model';
import {UnitService} from '../services/unit.service';
import {MatSnackBar} from '@angular/material';
import {Relation} from './relation.model';
import {TypeRelation} from './type-relation.enum';
import {RelationService} from '../services/relation.service';

export class LexEntity {

  tokenMatchers = [
    'new', '#', '~', '<', 'inherit', ':', '>', 'relation',
    'asociation', 'use', 'compose', ',',
    ['id', /[0-9]+/],
    ['text', /[a-zA-Z][a-zA-Z0-9]*/],
  ];
  ignorePattern = '[\n\s \t]+';

  unitService: any;
  snackBar: any;
  relationService: any;

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
        this.analyzeCommandUpdateUnit(id, name);
      } else if (token['name'] === '<') {
        this.analyzeCommandRelationInherit(command, id);
      }
    } else {
      return error();
    }
  }

   analyzeCommandRelationInherit(command: string, idTopUnit: object) {
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
       const semantics = lex.nextToken();
       if (semantics['name'] !== 'text') {
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
       const idLowerUnit = lex.nextToken();
       if (idLowerUnit['name'] !== 'id') {
         return error();
       }
       const token = lex.nextToken();
       if (token === undefined) {
         console.log('Exito');
         const relation = new Relation(TypeRelation.INHERIT, idTopUnit['lexeme'], idLowerUnit['lexeme']);
         console.log(relation);
         relation.saveRelation(this.relationService, this.snackBar);
       } else if (token['name'] === ',') {
         this.sequenceUnit(lex, idTopUnit, idLowerUnit);
       } else {
         return error();
       }
     }
   }

  sequenceUnit(lex, idTopUnit, idLowerUnit) {
    let ids;
    const key = [];
    do {
      ids = lex.nextToken();
      if (ids !== undefined) {
        if (ids['name'] === 'id') {
          key.push(ids['lexeme']);
        }
      }
    } while (ids);
    key.unshift(idLowerUnit['lexeme']);
    for (let j = 0; j < key.length; j++) {
      console.log(idTopUnit['lexeme'] + key[j]);
    }
  }



     /*else if (token['name'] === 'text') {
         const sharp = lex.nextToken();
         if (sharp['name'] !== '#') {
           return error();
         }
         const id = lex.nextToken();
         if (id['name'] !== 'id') {
           return error();
         }
       } else {
         return error();
       }
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
   // }
}
