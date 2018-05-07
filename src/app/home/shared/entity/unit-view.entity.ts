import { UnitEntity } from './unit.entity';
import { Node } from '../../d3/models/node';
import { Link } from '../../d3/models/link';
import { RelationEntity } from './relation.entity';

export class UnitViewEntity {

    unit: UnitEntity;
    childs: UnitViewEntity[] = [];
    x: number;
    xMiddle: number;
    y: number;
    xBlock: number;
    yBlock: number;
    widthBlock: number;

    constructor(unit) {
        this.unit = unit;
        this.x = 0;
        this.y = 0;
        this.xMiddle = 75;
    }

    appendChild(child: UnitViewEntity) {
        this.childs.push(child);
    }

    getChilds(): UnitViewEntity[] {
        return this.childs;
    }

    locate() {
        if (this.childs.length === 0) {
            this.x = 0;
            this.y = 0;
            this.xBlock = 0;
            this.yBlock = 0;
            this.widthBlock = 150;
            this.xMiddle = 75;
        } else {
            for (const child of this.childs) {
                child.locate();
            }
            let xShift = 0;
            for (const child of this.childs) {
                child.shift(xShift, 70);
                xShift += child.widthBlock + 10;
            }
            this.x = xShift / 2 - 75;
            this.y = 0;
            this.xBlock = 0;
            this.yBlock = 0;
            this.widthBlock = xShift;
            this.xMiddle = this.x + 75;
        }
    }

    shift(x: number, y: number) {
        this.x += x;
        this.y += y;
        this.xBlock += x;
        this.yBlock += y;
        for (const child of this.childs) {
            child.shift(x, y);
        }
    }

    createNode(): Node[] {
        const nodes: Node[] = [];
        const root: Node = new Node(this.unit.name, this.x, this.y);
        nodes.push(root);
        for (const child of this.childs) {
            for (const node of child.createNode()) {
                nodes.push(node);
            }
        }
        return nodes;
    }

    createLink(): Link[] {
        const links: Link[] = [];
        for (const child of this.childs) {
            const relation = new Link(this, child, this.unit.relation);
            links.push(relation);
            for (const link of child.createLink()) {
                links.push(link);
            }
        }
        return links;
    }

}
