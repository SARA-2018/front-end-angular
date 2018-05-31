import { Unit } from '../models/unit.model';
import { Node } from '../../d3/models/node';
import { Link } from '../../d3/models/link';
import { BlockViewImp } from './block.view';
import { UnitView } from './unit-view.interface';
import { BlockView } from './block-view.interface';

export class UnitViewImp implements UnitView {

    private unit: Unit;
    private x: number;
    private y: number;
    private xBlock: number;
    private yBlock: number;
    private blockViews: BlockViewImp[] = [];

    readonly xSize = 150;
    readonly xHalfSize = 75;
    readonly ySize = 35;
    readonly xSpaceBetweenUnits = 10;
    readonly ySpaceBetweenUnits = 35;

    constructor(unit: Unit) {
        this.unit = unit;
        this.x = 0;
        this.y = 0;
        for (const block of unit.getBlocks()) {
            this.blockViews.push(new BlockViewImp(block));
        }
    }

    getX(): number {
        return this.x;
    }

    getY(): number {
        return this.y;
    }

    getXMiddle(): number {
        return this.x + this.xHalfSize;
    }

    getYSouth(): number {
        return this.y + this.ySize;
    }

    getBlockViews(): BlockView[] {
        return this.blockViews;
    }

    calculateWidthBlock(): number {
        let width = 0;
        if (this.blockViews.length === 0) {
            width = this.xSize + this.xSpaceBetweenUnits;
        } else {
            for (const blockView of this.blockViews) {
                width += blockView.calculateWidthBlock() + this.xSpaceBetweenUnits;
            }
        }
        return width;
    }

    calculateVertexRelation() {
        const nodeDivisionForLink = this.xSize / (this.getBlockViews().length + 1);
        this.x += nodeDivisionForLink;
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
                blockView.shift(xShift, this.ySpaceBetweenUnits);
                xShift += blockView.calculateWidthBlock() + this.xSpaceBetweenUnits;
            }
            this.x = (xShift - this.xSpaceBetweenUnits) / 2 - this.xHalfSize;
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

    createNode(): Node[] {
        const result: Node[] = [];
        const root: Node = new Node(this.unit.getName() + '#' + this.unit.getCode(), this.x, this.y);
        result.push(root);
        for (const blockView of this.blockViews) {
            for (const node of blockView.createNode()) {
                result.push(node);
            }
        }
        return result;
    }

    createLink(): Link[] {
        const result: Link[] = [];
        for (const blockView of this.blockViews) {
            for (const link of blockView.createLink(this)) {
                result.push(link);
            }
        }
        return result;
    }

    log(margin: string) {
        console.log(margin + this.unit.getName());
        for (const blockView of this.blockViews) {
            blockView.log(margin + '   ');
        }
    }
}