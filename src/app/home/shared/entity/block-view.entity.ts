import { Node } from '../../d3/models/node';
import { Link } from '../../d3/models/link';
import { RelationView } from './relation-view.entity';
import { UnitView } from './unit-view.entity';
import { Block } from './block.entity';

export class BlockView {

    private block: Block;
    private x: number;
    private y: number;
    private widthBlock: number;
    private unitViews: UnitView[] = [];

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

    getWidthBlock() {
        return this.widthBlock;
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
            unit.shift(xShift, 70);
            xShift += unit.getWidthBlock() + 10;
        }
        this.x = xShift / 2 - 75;
        this.y = 0;
        this.widthBlock = xShift;
    }

    shift(x: number, y: number) {
        this.x += x;
        this.y += y;
        for (const unit of this.unitViews) {
            unit.shift(x, y);
        }
    }



}
