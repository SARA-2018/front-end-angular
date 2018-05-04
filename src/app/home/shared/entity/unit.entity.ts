export class Unit {
    id: number;
    name: string;
    childs: Unit[] = [];
    constructor(name) {
      this.name = name;
    }

    appendChild(child: Unit) {
      this.childs.push(child);
    }

    getChilds(): Unit[] {
      return this.childs;
    }
}
