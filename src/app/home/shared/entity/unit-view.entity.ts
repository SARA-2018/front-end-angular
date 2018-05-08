import { UnitEntity } from './unit.entity';
import { Node } from '../../d3/models/node';
import { Link } from '../../d3/models/link';
import { RelationEntity } from './relation.entity';
import { BlockViewEntity } from './block-view.entity';

export class UnitViewEntity {

    private unit: UnitEntity;
    private childsBlock: BlockViewEntity[] = [];
    private x: number;
    private xMiddle: number;
    private y: number;
    private xBlock: number;
    private yBlock: number;
    private widthBlock: number;

    constructor(unit: UnitEntity) {
        this.unit = unit;
        this.x = 0;
        this.y = 0;
        this.xMiddle = 75;
    }

    appendChild(child: UnitViewEntity, type: string) {
        let find = false;
        for (const block of this.childsBlock) {
            if (block.Type === type) {
                block.appendUnit(child);
                find = true;
            }
        }
        if (!find) {
            const block = new BlockViewEntity(type, child);
            this.childsBlock.push(block);
        }
    }

    get ChildsBlock() {
        return this.childsBlock;
    }

    get WidthBlock() {
        return this.widthBlock;
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
                xShift += child.WidthBlock + 10;
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
        const root: Node = new Node(this.unit.Name, this.x, this.y);
        nodes.push(root);
        for (const child of this.childsBlock) {
            for (const unit of child.Units) {
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
            for (const unit of child.Units) {
                const relation = new Link(this, unit, child.Type);
                links.push(relation);
                for (const link of unit.createLink()) {
                    links.push(link);
                }
            }
        }
        return links;
    }
}
