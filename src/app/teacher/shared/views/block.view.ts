import { Node } from '../../d3/models/node';
import { Link } from '../../d3/models/link';
import { UnitViewImp } from './unit.view';
import { Block } from '../models/block.model';
import { UnitView } from './unit-view.interface';
import { BlockView } from './block-view.interface';

export class BlockViewImp implements BlockView {

    private block: Block;
    private x: number;
    private y: number;
    private unitViews: UnitView[] = [];

    readonly xSpaceBetweenBlocks = 10;
    readonly ySpaceBetweenBlocks = 60;
    readonly halfSizeBlock = 75;

    constructor(block: Block) {
        this.x = 0;
        this.y = 0;
        this.block = block;
        for (const unit of this.block.getUnits()) {
            this.appendUnit(new UnitViewImp(unit));
        }
    }

    appendUnit(unit: UnitViewImp) {
        this.unitViews.push(unit);
    }

    getBlock() {
        return this.block;
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

    locate() {
        for (const unit of this.unitViews) {
            unit.locate();
        }
        let xShift = 0;
        for (const unitView of this.unitViews) {
            unitView.shift(xShift, this.ySpaceBetweenBlocks);
            xShift += unitView.calculateWidthBlock();
        }
        this.x = xShift / 2 - this.halfSizeBlock;
        this.y = 0;
    }

    shift(x: number, y: number) {
        this.x += x;
        this.y += y;
        for (const unitView of this.unitViews) {
            unitView.shift(x, y);
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

    log(margin: string) {
        for (const unitView of this.getUnitViews()) {
            unitView.log(margin);
        }
    }
}
