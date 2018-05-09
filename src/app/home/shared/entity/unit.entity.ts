import { Block } from './block.entity';

export class Unit {

  private id: number;
  private name: string;
  private blocks: Block[] = [];

  constructor(name: string) {
    this.name = name;
  }

  log(margin: string) {
    console.log(margin + this.Name);
    for (const block of this.Blocks) {
      block.log(block, margin + '   ');
    }
  }

  get Id() {
    return this.id;
  }

  get Blocks() {
    return this.blocks;
  }

  get Name() {
    return this.name;
  }

  appendUnit(unit: Unit, type: string) {
    let find = false;
    for (const block of this.blocks) {
      if (block.Type === type) {
        block.appendUnit(unit);
        find = true;
      }
    }
    if (!find) {
      this.blocks.push(new Block(type, unit));
    }
  }


}
