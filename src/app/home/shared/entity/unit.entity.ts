export class UnitEntity {

    id: number;
    name: string;
    childs: UnitEntity[] = [];
    relation: string;

    constructor(name) {
      this.name = name;
    }

    appendChild(child: UnitEntity) {
      this.childs.push(child);
    }

    getChilds(): UnitEntity[] {
      return this.childs;
    }

    setRelation(type: string) {
      this.relation = type;
    }
}
