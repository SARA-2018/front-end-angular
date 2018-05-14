import { Node } from '../../d3/models/node';
import { Link } from '../../d3/models/link';
import { RelationView } from './relation.view';
import { UnitView } from './unit.view';
import { Block } from '../models/block.model';
import { UnitViewInterface } from './unit-view.interface';
import { BlockViewInterface } from './block-view.interface';

export class BlockView implements BlockViewInterface {

    private block: Block;
    private x: number;
    private y: number;
    private unitViews: UnitViewInterface[] = [];

    readonly xSpaceBetweenBlocks = 10;
    readonly ySpaceBetweenBlocks = 60;
    readonly halfSizeBlock = 75;

    constructor(block: Block) {
        this.x = 0;
        this.y = 0;
        this.block = block;
        for (const unit of this.block.getUnits()) {
            this.appendUnit(new UnitView(unit));
        }
    }

    log(margin: string) {
        for (const unit of this.getUnitViews()) {
            unit.log(margin);
        }
    }

    createNode(): Node[] {
        const result = [];
        for (const unitView of this.getUnitViews()) {
            for (const node of unitView.createNode()) {
                result.push(node);
            }
        }
        return result;
    }

    appendUnit(unit: UnitView) {
        this.unitViews.push(unit);
    }

    getUnitViews() {
        return this.unitViews;
    }

    calculateWidthBlock(): number {
        let width = 0;
        for (const unitView of this.unitViews) {
            width += unitView.calculateWidthBlock() + this.xSpaceBetweenBlocks;
        }
        return width;
    }

    getBlock() {
        return this.block;
    }

    locate() {
        for (const unit of this.unitViews) {
            unit.locate();
        }
        let xShift = 0;
        for (const unit of this.unitViews) {
            unit.shift(xShift, this.ySpaceBetweenBlocks);
            xShift += unit.calculateWidthBlock();
        }
        this.x = xShift / 2 - this.halfSizeBlock;
        this.y = 0;
    }

    shift(x: number, y: number) {
        this.x += x;
        this.y += y;
        for (const unit of this.unitViews) {
            unit.shift(x, y);
        }
    }
}
