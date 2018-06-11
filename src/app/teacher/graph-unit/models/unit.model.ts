import { Block } from './block.model';
import { UnitService } from '../../graph-unit/services/unit.service';
import { Observable } from 'rxjs/Observable';
import { Relation } from './relation.model';

export class Unit {

  private code: number;
  private name: string;
  private ascendantBlock: Block;
  private descendantBlocks: Block[] = [];

  constructor(name: string, code?: number) {
    this.name = name;
    this.code = code;
  }

  getCode(): number {
    return this.code;
  }

  getBlocks(): Block[] {
    return this.descendantBlocks;
  }

  setAscendantBlock(ascendantBlock: Block) {
    this.ascendantBlock = ascendantBlock;
  }

  getName(): string {
    return this.name;
  }

  addRelation(relation: Relation) {
    if (this.descendantBlocks.length > 0) {
      let i = 0;
      while ((!this.descendantBlocks[i].validateRelation(relation)) && (i < this.descendantBlocks.length - 1)) {
        i++;
      }
      if (this.descendantBlocks[i].validateRelation(relation)) {
        this.descendantBlocks[i].addRelation(relation);
      } else {
        this.descendantBlocks.push(new Block(relation, this));
      }
    } else {
      this.descendantBlocks.push(new Block(relation, this));
    }
  }

  /*addRelation(relation: Relation) {
    if (this.descendantBlocks.length > 0) {
      const i = this.searchBlock(relation.getType(), relation.getSemantics());
      if (relation.getType() === this.descendantBlocks[i].getType()) {
        if (relation.getSemantics() !== undefined) {
          if (relation.getSemantics() === this.descendantBlocks[i].getSemantics()) {
            this.descendantBlocks[i].addRelation(relation);
          } else {
            this.descendantBlocks.push(new Block(relation, this));
          }
        } else {
          this.descendantBlocks[i].addRelation(relation);
        }
      } else {
        this.descendantBlocks.push(new Block(relation, this));
      }
    } else {
      this.descendantBlocks.push(new Block(relation, this));
    }
  }

  searchBlock(type: string, semantics?: string): number {
    let i = 0;
    if (semantics !== undefined) {
      while (semantics !== this.descendantBlocks[i].getSemantics() && (i < this.descendantBlocks.length - 1)) {
        i++;
      }
    } else {
      while (type !== this.descendantBlocks[i].getType() && (i < this.descendantBlocks.length - 1)) {
        i++;
      }
    }
    return i;
  }*/

  saveUnit(unitService: UnitService): Observable<any> {
    return unitService.create(this);
  }

  log(margin: string, unitsVisited: Unit[]) {
    if (unitsVisited.find(unit => unit.getCode() === this.getCode()) === undefined) {
      unitsVisited.push(this);
      console.log(margin + this.getName());
      for (const block of this.getBlocks()) {
        block.log(block, margin + '   ', unitsVisited);
      }
    }
  }
}

