import { Unit } from '../models/unit.model';
import { Node } from '../../d3/models/node';
import { Link } from '../../d3/models/link';
import { RelationView } from './relation.view';
import { BlockView } from './block.view';
import { UnitViewInterface } from './unit-view.interface';
import { BlockViewInterface } from './block-view.interface';

export class UnitView implements UnitViewInterface {

    private unit: Unit;
    private x: number;
    private y: number;
    private xBlock: number;
    private yBlock: number;
    private blockViews: BlockViewInterface[] = [];

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
        for (const block of this.blockViews) {
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

    calculateWidthBlock(): number {
        let width = 0;
        if (this.blockViews.length === 0) {
            width = 150;
        } else {
            for (const blockView of this.blockViews) {
                width += blockView.calculateWidthBlock() + 10;
            }
        }
        return width;
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
            this.calculateWidthBlock();
        } else {
            for (const blockView of this.blockViews) {
                blockView.locate();
            }
            let xShift = 0;
            for (const blockView of this.blockViews) {
                blockView.shift(xShift, 35);
                xShift += blockView.calculateWidthBlock() + 10;
            }
            this.x = (xShift - 10) / 2 - 75;
            this.y = 0;
            this.xBlock = 0;
            this.yBlock = 0;
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
            const nodeDivisionForLink = 150 / (this.blockViews.length + 1);
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
