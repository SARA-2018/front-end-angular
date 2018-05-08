import { UnitEntity } from './unit.entity';
import { Node } from '../../d3/models/node';
import { Link } from '../../d3/models/link';
import { RelationEntity } from './relation.entity';
import { BlockViewEntity } from './block-view.entity';

export class UnitViewEntity {

    unit: UnitEntity;
    childsBlock: BlockViewEntity[] = [];
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

    appendChild(child: UnitViewEntity, type: string) {
        let find = false;
        for (const block of this.childsBlock) {
            if (block.getType() === type) {
                block.appendUnit(child);
                find = true;
            }
        }
        if (!find) {
            const block = new BlockViewEntity(type, child);
            this.childsBlock.push(block);
        }
    }

    getchildsBlock(): BlockViewEntity[] {
        return this.childsBlock;
    }

   /* locate() {
        if (this.childsBlock.length === 0) {
            this.x = 0;
            this.y = 0;
            this.xBlock = 0;
            this.yBlock = 0;
            this.widthBlock = 150;
            this.xMiddle = 75;
        } else {
            for (const child of this.childsBlock) {
                child.locate();
            }
            let xShift = 0;
            for (const child of this.childsBlock) {
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
        for (const child of this.childsBlock) {
            child.shift(x, y);
        }
    } */

    locate() {
        if (this.childsBlock.length === 0) {
            this.x = 0;
            this.y = 0;
            this.xBlock = 0;
            this.yBlock = 0;
            this.widthBlock = 150;
            this.xMiddle = 75;
        } else {
            for (const child of this.childsBlock) {
                child.locate();
            }
            let xShift = 0;
            for (const child of this.childsBlock) {
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
        for (const child of this.childsBlock) {
            child.shift(x, y);
        }
    }

    createNode(): Node[] {
        const nodes: Node[] = [];
        const root: Node = new Node(this.unit.name, this.x, this.y);
        nodes.push(root);
        for (const child of this.childsBlock) {
            for (const unit of child.units) {
                for (const node of unit.createNode()) {
                    nodes.push(node);
                }
            }
        }
        return nodes;
    }

    createLink(): Link[] {
        const links: Link[] = [];
        for (const child of this.childsBlock) {
            for (const unit of child.units) {
                const relation = new Link(this, unit, child.getType());
                links.push(relation);
                for (const link of unit.createLink()) {
                    links.push(link);
                }
            }
        }
        return links;
    }
}
