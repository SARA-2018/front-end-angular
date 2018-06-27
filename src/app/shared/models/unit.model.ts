import { Block } from '../../teacher/graph-unit/models/block.model';
import { UnitService } from '../services/unit.service';
import { Observable } from 'rxjs/Observable';
import { Relation } from '../../teacher/graph-unit/models/relation.model';
import { Itinerary } from './itinerary.model';

export class Unit {

  private code: number;
  private name: string;
  content: string;
  private itineraries: Itinerary[] = [];
  private ascendantBlock: Block;
  private descendantBlocks: Block[] = [];

  constructor(name: string, code?: number, content?: string) {
    this.name = name;
    this.code = code;
    this.content = content;
  }

  getCode(): number {
    return this.code;
  }

  getBlocks(): Block[] {
    return this.descendantBlocks;
  }
  getContent(): string {
    return this.content;
  }
  setContent(content: string) {
    this.content = content;
  }

  addItinerary(itinerary: Itinerary) {
    this.itineraries.push(itinerary);
  }

  getItineraries(): Itinerary[] {
    return this.itineraries;
  }

  setItineraries(itinerary: Itinerary[]) {
    this.itineraries = itinerary;
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

