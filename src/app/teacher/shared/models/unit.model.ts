import { Block } from './block.model';
import { MatSnackBar } from '@angular/material';
import { UnitService } from '../services/unit.service';
import { Observable } from 'rxjs/Observable';

export class Unit {

  private code: number;
  private name: string;
  private blocks: Block[] = [];
  private visited: boolean;

  constructor(name: string, code?: number) {
    this.name = name;
    this.code = code;
  }

  getCode(): number {
    return this.code;
  }

  getBlocks(): Block[] {
    return this.blocks;
  }

  getName(): string {
    return this.name;
  }

  isVisited(): boolean {
    return this.visited;
  }

  appendUnit(unit: Unit, type: string, semantics: string, cardinalTopUnit: string, cardinalLowerUnit: string) {
    this.visited = true;
    if (!unit.isVisited()) {
      if (this.blocks.length > 0) {
        const i = this.searchBlock(type, semantics);
        if (type === this.blocks[i].getType()) {
          if (semantics !== undefined) {
            if (semantics === this.blocks[i].getSemantics()) {
              this.blocks[i].appendUnit(unit);
            } else {
              this.blocks.push(new Block(unit, type, semantics, cardinalTopUnit, cardinalLowerUnit));
            }
          } else {
            this.blocks[i].appendUnit(unit);
          }
        } else {
          this.blocks.push(new Block(unit, type, semantics, cardinalTopUnit, cardinalLowerUnit));
        }
      } else {
        this.blocks.push(new Block(unit, type, semantics, cardinalTopUnit, cardinalLowerUnit));
      }
    }
  }

  searchBlock(type: string, semantics?: string): number {
    let i = 0;
    if (semantics !== undefined) {
      while (semantics !== this.blocks[i].getSemantics() && (i < this.blocks.length - 1)) {
        i++;
      }
    } else {
      while (type !== this.blocks[i].getType() && (i < this.blocks.length - 1)) {
        i++;
      }
    }
    return i;
  }

  saveUnit(unitService: UnitService) {
    unitService.create(this);
  }

  log(margin: string) {
    console.log(margin + this.getName());
    for (const block of this.getBlocks()) {
      block.log(block, margin + '   ');
    }
  }
}

