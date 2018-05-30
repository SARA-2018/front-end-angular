import { Block } from './block.model';
import { UnitService } from '../services/unit.service';
import { Observable } from 'rxjs/Observable';
import { Relation } from './relation.model';

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

  addRelation(relation: Relation) {
    this.visited = true;
    if (!relation.getLowerUnit().isVisited()) {
      if (this.blocks.length > 0) {
        const i = this.searchBlock(relation.getType(), relation.getSemantics());
        if (relation.getType() === this.blocks[i].getType()) {
          if (relation.getSemantics() !== undefined) {
            if (relation.getSemantics() === this.blocks[i].getSemantics()) {
              this.blocks[i].addRelation(relation);
            } else {
              this.blocks.push(new Block(relation));
            }
          } else {
            this.blocks[i].addRelation(relation);
          }
        } else {
          this.blocks.push(new Block(relation));
        }
      } else {
        this.blocks.push(new Block(relation));
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

  saveUnit(unitService: UnitService): Observable<any> {
    return unitService.create(this);
  }

  log(margin: string) {
    console.log(margin + this.getName());
    for (const block of this.getBlocks()) {
      block.log(block, margin + '   ');
    }
  }
}

