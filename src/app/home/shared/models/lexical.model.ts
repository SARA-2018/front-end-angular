import { error } from 'util';
import * as Lex from 'lexical-parser';
import { Unit } from './unit.model';
import { UnitService } from '../services/unit.service';
import { MatSnackBar } from '@angular/material';
import { RelationOutput } from './relation-output.model';
import { TypeRelation } from './type-relation.enum';
import { RelationService } from '../services/relation.service';
import { Observable } from 'rxjs/Observable';
import {Injectable} from '@angular/core';

@Injectable()
export class Lexical {

  readonly tokenMatchers = [
    'new', '#', '~', '<', 'inherit', ':', '>', 'relation',
    'asociation', 'use', 'compose', ',', '*', '+',
    ['code', /[0-9]+/],
    ['text', /[a-záéíóúA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ][a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ0-9]*/],
    ['cardinal', /\W.[n|m*+.(n|m*+)][0-9.(nm*+0-9)]+/],
  ];
  readonly ignorePattern = '[\n\s \t]+';

  constructor(private unitService: UnitService, private relationService: RelationService, private snackBar: MatSnackBar) {
  }

  public analyzeCommand(command: string): Observable<any> {
    return new Observable(observer => {
      const lex = new Lex(command, this.tokenMatchers, this.ignorePattern);
      const token = lex.nextToken();
      console.log('1 - analizar comando');
      switch (token['name']) {
        case '~':
          const val = command.split('~');
          command = val.pop();
          this.analyzeCommandDeleteUnit(command);
          observer.next();
          observer.complete();
          break;
        case 'text':
          const text = command.split(token['lexeme']);
          command = text.pop();
          this.analyzeCommandCreateUnit(command, token).subscribe(
            () => {
              observer.next();
              observer.complete();
              console.log('7 - Observador completo ');
            });
          break;
        default:
          observer.error();
          return error();
      }
    });
  }

  private analyzeCommandDeleteUnit(commandDelete: string) {
    const lex = new Lex(commandDelete, this.tokenMatchers, this.ignorePattern);
    const name = lex.nextToken();
    if (name['name'] !== 'text') {
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
      this.unitService.delete(code['lexeme']).subscribe(() => {
          this.snackBar.open('Eliminado Correctamente !', '', {
            duration: 8000
          });
        },
        () => {
          this.snackBar.open('Recurso no encontrado !', '', {
            duration: 8000
          });
        });
    } else {
      if (relation['name'] === 'relation') {
       // this.analyzeCommandDeleteRelation();
      }
    }
  }

  private analyzeCommandCreateUnit(command: string, name: object): Observable<any> {
    return new Observable(observer => {
      console.log('2 - Analizar comando crear');
      const lex = new Lex(command, this.tokenMatchers, this.ignorePattern);
      const sharp = lex.nextToken();
      if (sharp['name'] !== '#') {
        return error();
      }
      const idTopUnit = lex.nextToken();
      if (idTopUnit['name'] === 'new') {
        const unit = new Unit(name['lexeme']);
        console.log('3 - Llamar a guardar unidad');
        unit.saveUnit(this.unitService, this.snackBar).subscribe(
          () => {
            observer.next();
            observer.complete();
          }
        );
      } else if (idTopUnit['name'] === 'code') {
        const token = lex.nextToken();
        if (token['name'] === ':') {
          const cardinal = lex.nextToken();
          if (cardinal === undefined) {
           // this.analyzeCommandUpdateUnit(idTopUnit, name);
          } else if (cardinal['name'] === 'code' || cardinal['name'] === '+' || cardinal['name'] === '*') {
            const more = lex.nextToken();
            const relation = lex.nextToken();
            if (more['name'] === '<') {
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
        } else if (token['name'] === 'cardinal') {
          const cardinal = token['lexeme'].split(':');
          const more = lex.nextToken();
          if (more['name'] === '<') {
            const relation = lex.nextToken();
            if (relation['name'] === 'compose') {
              this.analyzeCommandRelationCompose(command, idTopUnit, cardinal[1]);
            } else if (relation['name'] === 'asociation') {
              this.analyzeCommandRelationAsociation(command, idTopUnit, cardinal[1]);
            }
          } else if (more['name'] === 'asociation') {
            this.analyzeCommandRelationAsociation(command, idTopUnit, cardinal[1]);
          }
        } else if (token['name'] === '<') {
          const relation = lex.nextToken();
          if (relation['name'] === 'inherit') {
            this.analyzeCommandRelationInherit(command, idTopUnit, lex);
          } else if (relation['name'] === 'compose') {
            this.analyzeCommandRelationCompose(command, idTopUnit);
          } else if (relation['name'] === 'asociation') {
            this.analyzeCommandRelationAsociation(command, idTopUnit);
          } else {
            return error();
          }
        } else if (token['name'] === 'inherit') {
          this.analyzeCommandRelationInherit(command, idTopUnit, lex);
        } else if (token['name'] === 'compose') {
          this.analyzeCommandRelationCompose(command, idTopUnit);
        } else if (token['name'] === 'asociation') {
          this.analyzeCommandRelationAsociation(command, idTopUnit);
        } else {
          return error();
        }
      } else {
        return error();
      }
    });
  }

  private analyzeCommandRelationCompose(command: string, idTopUnit: object, cardinal?: string) {
    const lexNotCardinal = new Lex(command, this.tokenMatchers, this.ignorePattern);
    for (let i = 0; i <= 3; i++) {
      lexNotCardinal.nextToken();
    }
    let token;
    const relation = [];
    const lexYesCardinal = new Lex(command, this.tokenMatchers, this.ignorePattern);
    for (let i = 0; i <= 5; i++) {
      token = lexYesCardinal.nextToken();
      relation.push(token['name']);
    }
    if (relation[4] + relation[5] === '<compose') {
      this.sequenceUnit(TypeRelation.COMPOSE, lexYesCardinal, idTopUnit, '<compose', undefined, cardinal);
    } else if (relation[3] + relation[4] === '<compose') {
      lexNotCardinal.nextToken();
      this.sequenceUnit(TypeRelation.COMPOSE, lexNotCardinal, idTopUnit, '<compose', undefined, cardinal);
    } else if (relation[2] + relation[3] === '<compose' || relation[2] + relation[3] === 'compose>') {
      this.sequenceUnit(TypeRelation.COMPOSE, lexNotCardinal, idTopUnit, relation[2] + relation[3]);
    } else {
      return error();
    }
  }

  private analyzeCommandRelationAsociation(command: string, idTopUnit: object, cardinal?: string) {
    const lexNotCardinal = new Lex(command, this.tokenMatchers, this.ignorePattern);
    for (let i = 0; i <= 3; i++) {
      lexNotCardinal.nextToken();
    }
    let token;
    const relation = [];
    const lexSemantics = new Lex(command, this.tokenMatchers, this.ignorePattern);
    const lexYesCardinal = new Lex(command, this.tokenMatchers, this.ignorePattern);
    for (let i = 0; i <= 5; i++) {
      lexSemantics.nextToken();
      token = lexYesCardinal.nextToken();
      relation.push(token['name']);
    }
    if (relation[4] + relation[5] === '<asociation') {
      const point = lexSemantics.nextToken();
      if (point['name'] === ':') {
        const semantics = lexSemantics.nextToken();
        if (semantics['name'] === 'text') {
          this.sequenceUnit(TypeRelation.ASOCIATION, lexSemantics, idTopUnit, '<asociation', semantics['lexeme'], cardinal);
        } else {
          return error();
        }
      } else {
        this.sequenceUnit(TypeRelation.ASOCIATION, lexYesCardinal, idTopUnit, '<asociation', undefined, cardinal);
      }
    } else if (relation[3] + relation[4] === '<asociation') {
      if (token['name'] === ':') {
        const semantics = lexSemantics.nextToken();
        if (semantics['name'] === 'text') {
          this.sequenceUnit(TypeRelation.ASOCIATION, lexSemantics, idTopUnit, '<asociation', semantics['lexeme'], cardinal);
        } else {
          return error();
        }
      } else {
        lexNotCardinal.nextToken();
        this.sequenceUnit(TypeRelation.ASOCIATION, lexNotCardinal, idTopUnit, '<asociation', undefined, cardinal);
      }
    } else if (relation[2] + relation[3] === '<asociation' ) {
      if (token['name'] === 'text') {
        this.sequenceUnit(TypeRelation.ASOCIATION, lexYesCardinal, idTopUnit, '<asociation', token['lexeme']);
      } else {
        this.sequenceUnit(TypeRelation.ASOCIATION, lexNotCardinal, idTopUnit, '<asociation');
      }
    } else {
      return error();
    }
  }

  private analyzeCommandRelationInherit(command: string, idTopUnit: object, lex) {
    const point = lex.nextToken();
    if (point['name'] === ':') {
      const semantics = lex.nextToken();
      if (semantics['name'] !== 'text') {
        return error();
      }
      const lexYesSemantics = new Lex(command, this.tokenMatchers, this.ignorePattern);
      let token;
      const relation = [];
      for (let i = 0; i <= 5; i++) {
        token = lexYesSemantics.nextToken();
        relation.push(token['name']);
      }
      if (relation[2] + relation[5] === 'inherit>') {
        this.sequenceUnit(TypeRelation.INHERIT, lexYesSemantics, idTopUnit, 'inherit>', semantics['lexeme']);
      } else if (relation[2] + relation[3] === '<inherit') {
        this.sequenceUnit(TypeRelation.INHERIT, lex, idTopUnit, '<inherit', semantics['lexeme']);
      }
    } else {
      const lexNotSemantics = new Lex(command, this.tokenMatchers, this.ignorePattern);
      let token;
      const relation = [];
      for (let i = 0; i <= 3; i++) {
        token = lexNotSemantics.nextToken();
        relation.push(token['name']);
      }
      if (relation[2] + relation[3] === '<inherit' || relation[2] + relation[3] === 'inherit>') {
        this.sequenceUnit(TypeRelation.INHERIT, lexNotSemantics, idTopUnit, relation[2] + relation[3]);
      }
    }
  }

  private sequenceUnit(relationType: TypeRelation, lex, idTopUnit, relation: string, semantics?: string, cardinal?: string) {
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
      if (relation === '<inherit' || relation === '<compose' || relation === '<asociation') {
        this.createRelation(relationType, idTopUnit['lexeme'], idLowerUnit['lexeme'], semantics, cardinal);
      } else if (relation === 'inherit>' || relation === 'compose>' || relation === 'asociation>') {
        this.createRelation(relationType, idLowerUnit['lexeme'], idTopUnit['lexeme'], semantics, cardinal);
      } else {
        return error();
      }
    } else if (token['name'] === 'cardinal') {
      cardinal = token['lexeme'].split(':');
      if (relation === 'compose>' || relation === '<asociation' || relation === 'asociation>') {
        const point = lex.nextToken();
        if (point === undefined) {
          this.createRelation(relationType, idLowerUnit['lexeme'], idTopUnit['lexeme'], semantics, cardinal[1]);
        } else if (point['name'] === ',') {
          this.createMoreRelations(lex, idTopUnit, idLowerUnit, relation, relationType, semantics, cardinal[1]);
        }
      }
    } else if (token['name'] === ':') {
      if (relation === 'compose>' || relation === '<asociation' || relation === 'asociation>') {
        cardinal = lex.nextToken();
        if (cardinal['name'] === 'code' || cardinal['name'] === '+' || cardinal['name'] === '*') {
          const point = lex.nextToken();
          if (point === undefined) {
            this.createRelation(relationType, idLowerUnit['lexeme'], idTopUnit['lexeme'], semantics, cardinal['lexeme']);
          } else if (point['name'] === ',') {
            this.createMoreRelations(lex, idTopUnit, idLowerUnit, relation, relationType, semantics, cardinal['lexeme']);
          }
        } else {
          return error();
        }
      } else {
        return error();
      }
    } else if (token['name'] === ',') {
      this.createMoreRelations(lex, idTopUnit, idLowerUnit, relation, relationType, semantics, cardinal);
    } else {
      return error();
    }
  }

  private createMoreRelations(lex, idTopUnit, idLowerUnit, relation: string, relationType: TypeRelation, semantics: string,
                              cardinal: string) {
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
      if (relation === '<inherit' || relation === '<compose') {
        this.createRelation(relationType, idTopUnit['lexeme'], idLowerUnits[j], semantics, cardinal);
      } else if (relation === 'inherit>' || relation === 'compose>') {
        this.createRelation(relationType, idLowerUnits[j], idTopUnit['lexeme'], semantics, cardinals[j]);
      } else {
        return error();
      }
    }
  }

  private createRelation(relations: TypeRelation, idTopUnit: number, idLowerUnit: number, semantics: string,
                         cardinal: string): RelationOutput {
    const relation = new RelationOutput(relations, idTopUnit, idLowerUnit, semantics, cardinal);
    relation.saveRelation(this.relationService, this.snackBar);
    return relation;
  }
}
