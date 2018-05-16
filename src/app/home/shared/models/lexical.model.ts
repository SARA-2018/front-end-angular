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
    'asociation', 'use', 'compose', ',',
    ['id', /[0-9]+/],
    ['text', /[a-zA-Z][a-zA-Z0-9]*/],
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
        this.analyzeCommandUpdateUnit(id, name);
      } else if (token['name'] === '<') {
        const inherit = lex.nextToken();
        if (inherit['name'] !== 'inherit') {
          return error();
        }
        this.analyzeCommandRelationInherit(lex, command, id);
      } else if (token['name'] === 'inherit') {
        this.analyzeCommandRelationInherit(lex, command, id);
      }
    } else {
      return error();
    }
  }

   analyzeCommandRelationInherit(lex, command: string, idTopUnit: object) {
     const point = lex.nextToken();
     if (point['name'] === ':') {
       const semantics = lex.nextToken();
       if (semantics['name'] !== 'text') {
         return error();
       }
       const lexAux = new Lex(command, this.tokenMatchers, this.ignorePattern);
       let operator;
       for (let i = 0; i <= 5; i++) {
         operator = lexAux.nextToken();
        if (operator !== undefined) {
          if (operator['name'] === '>') {
            this.sequenceUnit(lexAux, idTopUnit, operator['lexeme'], semantics['lexeme']);
          } else if (operator['name'] === '<') {
            this.sequenceUnit(lex, idTopUnit, operator['lexeme'], semantics['lexeme']);
          }
        }
       }
     } else {
       const lexAux = new Lex(command, this.tokenMatchers, this.ignorePattern);
       let operator;
       for (let i = 0; i <= 3; i++) {
         operator = lexAux.nextToken();
         if (operator !== undefined) {
           if (operator['lexeme'] === '<') {
             lexAux.nextToken();
             this.sequenceUnit(lexAux, idTopUnit, operator['lexeme']);
           } else if (operator['lexeme'] === '>') {
             this.sequenceUnit(lexAux, idTopUnit, operator['lexeme']);
           }
         }
       }
     }
   }

  sequenceUnit(lex, idTopUnit, operator, semantics?) {
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
      if (operator === '<') {
        this.createRelationInherit(TypeRelation.INHERIT, idTopUnit['lexeme'], idLowerUnit['lexeme'], semantics);
      } else if (operator === '>') {
        this.createRelationInherit(TypeRelation.INHERIT, idLowerUnit['lexeme'], idTopUnit['lexeme'], semantics);
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
        if (operator === '<') {
          this.createRelationInherit(TypeRelation.INHERIT, idTopUnit['lexeme'], idLowerUnits[j], semantics);
        } else if (operator === '>') {
          this.createRelationInherit(TypeRelation.INHERIT,  idLowerUnits[j], idTopUnit['lexeme'], semantics);
        }
      }
    } else {
      return error();
    }
  }

  private createRelationInherit(INHERIT: TypeRelation, idTopUnit: number, idLowerUnit: number, semantics: string): RelationOutput {
    const relation = new RelationOutput(INHERIT, idTopUnit, idLowerUnit, semantics);
    relation.saveRelation(this.relationService, this.snackBar);
    return relation;
  }
}