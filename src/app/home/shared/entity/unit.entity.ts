import { BlockEntity } from './block.entity';

export class UnitEntity {

  id: number;
  name: string;
  childsBlock: BlockEntity[] = [];
  relation: string;

  constructor(name) {
    this.name = name;
  }

  appendChild(child: UnitEntity, type: string) {
    let find = false;
    for (const block of this.childsBlock) {
      if (block.getType() === type) {
        block.appendUnit(child);
        find = true;
      }
    }
    if (!find) {
      const block = new BlockEntity(type, child);
      this.childsBlock.push(block);
    }
  }

  getBlocks(): BlockEntity[] {
    return this.childsBlock;
  }

  setRelation(type: string) {
    this.relation = type;
  }
}
