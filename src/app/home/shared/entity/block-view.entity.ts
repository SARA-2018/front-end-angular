import { Node } from '../../d3/models/node';
import { Link } from '../../d3/models/link';
import { Relation } from './relation.entity';
import { UnitView } from './unit-view.entity';
import { Block } from './block.entity';

export class BlockView {

    private block: Block;
    private x: number;
    private y: number;
    private widthBlock: number;
    private heightBlock: number;
    private unitViews: UnitView[] = [];

    constructor(block: Block) {
        this.x = 0;
        this.y = 0;
        this.block = block;
        for (const unit of this.block.Units) {
            this.appendUnit(new UnitView(unit));
        }
    }

    log(margin: string) {
        for (const unit of this.UnitViews) {
            unit.log(margin);
        }
    }


    createNode(): Node[] {
        const result = [];
        for (const unitView of this.UnitViews) {
            for (const node of unitView.createNode()) {
                result.push(node);
            }
        }
        console.log('Block result ' + result);
        return result;
    }

    appendUnit(unit: UnitView) {
        this.unitViews.push(unit);
    }

    get UnitViews() {
        return this.unitViews;
    }

    get WidthBlock() {
        return this.widthBlock;
    }

    get Block() {
        return this.block;
    }

    locate() {
        for (const unit of this.unitViews) {
            unit.locate();
        }
        let xShift = 0;
        for (const unit of this.unitViews) {
            unit.shift(xShift, 70);
            xShift += unit.WidthBlock + 10;
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
