import { BlockEntity } from './block.entity';

export class UnitEntity {

  private id: number;
  private name: string;
  private childsBlock: BlockEntity[] = [];
  private relation: string;

  constructor(name: string) {
    this.name = name;
  }

  get Id() {
    return this.id;
  }

  get ChildsBlock() {
    return this.childsBlock;
  }

  get Name() {
    return this.name;
  }

  get Relation() {
    return this.relation;
  }

  setRelation(relation: string) {
    this.relation = relation;
  }

  appendChild(child: UnitEntity, type: string) {
    let find = false;
    for (const block of this.childsBlock) {
      if (block.Type === type) {
        block.appendUnit(child);
        find = true;
      }
    }
    if (!find) {
      const block = new BlockEntity(type, child);
      this.childsBlock.push(block);
    }
  }
}
