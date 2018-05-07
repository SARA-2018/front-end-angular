export class Unit {

    id: number;
    name: string;
    childs: Unit[] = [];
    relation: string;

    constructor(name) {
      this.name = name;
    }

    appendChild(child: Unit) {
      this.childs.push(child);
    }

    getChilds(): Unit[] {
      return this.childs;
    }

    setRelation(type: string) {
      this.relation = type;
    }
}
