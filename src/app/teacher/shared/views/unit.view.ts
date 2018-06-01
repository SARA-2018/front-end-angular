import { Unit } from '../models/unit.model';
import { Node } from '../../d3/models/node';
import { Link } from '../../d3/models/link';
import { BlockViewImp } from './block.view';
import { UnitView } from './unit-view.interface';
import { BlockView } from './block-view.interface';

export class UnitViewImp {

    private unit: Unit;
    private x: number;
    private y: number;
    private xBlock: number;
    private yBlock: number;
    private ascendantBlockView: BlockViewImp;
    private descendantBlockViews: BlockViewImp[] = [];
    private placed: boolean;

    readonly xSize = 150;
    readonly xHalfSize = 75;
    readonly ySize = 35;
    readonly xSpaceBetweenUnits = 10;
    readonly ySpaceBetweenUnits = 35;

    constructor(unit: Unit, ascendantBlockView?: BlockViewImp) {
        this.unit = unit;
        this.ascendantBlockView = ascendantBlockView;
        this.x = 0;
        this.y = 0;
        for (const block of unit.getBlocks()) {
            this.descendantBlockViews.push(new BlockViewImp(block, this));
        }
        console.log(this.unit.getName() + ' blocks: ' + this.descendantBlockViews.length);
    }

    existUnitView(unit: Unit): UnitViewImp {
        if (this.getUnit().getCode() === unit.getCode()) {
            return this;
        } else {
            if (this.ascendantBlockView) {
                return this.ascendantBlockView.existUnitView(unit);
            } else {
                return undefined;
            }
        }
    }

    getX(): number {
        return this.x;
    }

    getY(): number {
        return this.y;
    }

    isPlaced(): boolean {
        return this.placed;
    }

    getXMiddle(): number {
        return this.x + this.xHalfSize;
    }

    getYSouth(): number {
        return this.y + this.ySize;
    }

    getBlockViews(): BlockViewImp[] {
        return this.descendantBlockViews;
    }

    getUnit(): Unit {
        return this.unit;
    }

    calculateWidthBlock(): number {
        let width = 0;
        if (this.descendantBlockViews.length === 0) {
            width = this.xSize + this.xSpaceBetweenUnits;
        } else {
            for (const blockView of this.descendantBlockViews) {
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
        if (!this.placed) {
            this.placed = true;
            if (this.descendantBlockViews.length === 0) {
                this.x = 0;
                this.y = 0;
                this.xBlock = 0;
                this.yBlock = 0;
                this.calculateWidthBlock();
            } else {
                for (const blockView of this.descendantBlockViews) {
                    blockView.locate();
                }
                let xShift = 0;
                for (const blockView of this.descendantBlockViews) {
                    blockView.shift(xShift, this.ySpaceBetweenUnits);
                    xShift += blockView.calculateWidthBlock() + this.xSpaceBetweenUnits;
                }
                this.x = (xShift - this.xSpaceBetweenUnits) / 2 - this.xHalfSize;
                this.y = 0;
                this.xBlock = 0;
                this.yBlock = 0;
            }
        }
    }

    shift(x: number, y: number) {
        this.x += x;
        this.y += y;
        this.xBlock += x;
        this.yBlock += y;
        for (const block of this.descendantBlockViews) {
            block.shift(x, y);
        }
    }

    createNode(): Node[] {
        const result: Node[] = [];
        const root: Node = new Node(this.unit.getName() + '#' + this.unit.getCode(), this.x, this.y);
        result.push(root);
        for (const blockView of this.descendantBlockViews) {
            for (const node of blockView.createNode()) {
                result.push(node);
            }
        }
        return result;
    }

    createLink(): Link[] {
        const result: Link[] = [];
        for (const blockView of this.descendantBlockViews) {
            for (const link of blockView.createLink(this)) {
                result.push(link);
            }
        }
        return result;
    }

    log (margin: string, unitViewsVisited: UnitViewImp[]) {
        if (unitViewsVisited.find(unitView => unitView.getUnit().getCode() === this.getUnit().getCode()) === undefined) {
            unitViewsVisited.push(this);
            console.log(margin + this.unit.getName());
            for (const blockView of this.descendantBlockViews) {
                blockView.log(margin + '   ', unitViewsVisited);
            }
        }
    }
}
