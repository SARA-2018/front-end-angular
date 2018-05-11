import { Unit } from './unit.entity';
import { Node } from '../../d3/models/node';
import { Link } from '../../d3/models/link';
import { RelationView } from './relation-view.entity';
import { BlockView } from './block-view.entity';

export class UnitView {

    private unit: Unit;
    private x: number;
    private y: number;
    private xBlock: number;
    private yBlock: number;
    private blockViews: BlockView[] = [];
    private widthBlock: number; // Local

    constructor(unit: Unit) {
        this.unit = unit;
        this.x = 0;
        this.y = 0;
        for (const block of unit.getBlocks()) {
            this.append(new BlockView(block));
        }
    }

    log(margin: string) {
        console.log(margin + this.getUnit().getName());
        for (const block of this.getBlockViews()) {
            block.log(margin + '   ');
        }
    }

    createNode(): Node[] {
        const result: Node[] = [];
        const root: Node = new Node(this.unit.getName(), this.x, this.y);
        result.push(root);
        for (const block of this.blockViews) {
            for (const node of block.createNode()) {
                result.push(node);
            }
        }
        return result;
    }

    append(block: BlockView) {
        this.blockViews.push(block);
    }

    getBlockViews() {
        return this.blockViews;
    }

    getWidthBlock() {
        return this.widthBlock;
    }

    getUnit() {
        return this.unit;
    }

    locate() {
        if (this.blockViews.length === 0) {
            this.x = 0;
            this.y = 0;
            this.xBlock = 0;
            this.yBlock = 0;
            this.widthBlock = 150;
        } else {
            for (const blockView of this.blockViews) {
                blockView.locate();
            }
            let xShift = 0;
            for (const blockView of this.blockViews) {
                blockView.shift(xShift, 35);
                xShift += blockView.getWidthBlock() + 10;
            }
            this.x = (xShift - 10) / 2 - 75;
            this.y = 0;
            this.xBlock = 0;
            this.yBlock = 0;
            this.widthBlock = xShift;
        }
    }

    shift(x: number, y: number) {
        this.x += x;
        this.y += y;
        this.xBlock += x;
        this.yBlock += y;
        for (const block of this.blockViews) {
            block.shift(x, y);
        }
    }

    getXMiddle() {
        return this.x + 75;
    }

    createLink(): Link[] {
        const links: Link[] = [];
        if (this.getBlockViews().length <= 1) {
            for (const block of this.blockViews) {
                for (const unit of block.getUnitViews()) {
                    const relation = new Link(this, unit, block.getBlock().getType());
                    links.push(relation);
                    for (const link of unit.createLink()) {
                        links.push(link);
                    }
                }
            }
        } else {
            console.log('Create Link ' + this.unit.getName());
            const nodeDivisionForLink = 150 / (this.getBlockViews().length + 1);
            console.log(' X ' + this.x + ' Y ' + this.y);
            for (let i = 0; i < this.blockViews.length; i++) {
                 this.x += (nodeDivisionForLink * i);
                for (const unit of this.blockViews[i].getUnitViews()) {
                    const relation = new Link(this, unit, this.blockViews[i].getBlock().getType());
                    links.push(relation);
                    for (const link of unit.createLink()) {
                        links.push(link);
                    }
                }
                console.log('FOR X ' + this.x + ' Y ' + this.y);
            }
        }
        return links;
    }
}
