import { Node } from '../../d3/models/node';
import { Link } from '../../d3/models/link';
import { RelationEntity } from './relation.entity';
import { UnitViewEntity } from './unit-view.entity';

export class BlockViewEntity {

    private type: string;
    private semantics: string;
    private units: UnitViewEntity[] = [];

    private x: number;
    private y: number;
    private widthBlock: number;
    private heightBlock: number;

    constructor(type: string, unit: UnitViewEntity) {
        this.x = 0;
        this.y = 0;
        this.type = type;
        this.units.push(unit);
    }

    appendUnit(unit: UnitViewEntity) {
        this.units.push(unit);
    }

    get Type() {
        return this.type;
    }

    get Units() {
        return this.units;
    }

    get WidthBlock() {
        return this.widthBlock;
    }

    locate() {
        for (const unit of this.units) {
            unit.locate();
            this.widthBlock += unit.WidthBlock;
        }
        let xShift = 0;
        for (const unit of this.units) {
            unit.shift(xShift, 70);
            xShift += unit.WidthBlock + 10;
        }
        this.x = xShift / 2 - 75;
        this.y = 0;
        this.widthBlock = xShift;
        console.log('BLOCK VIEW -- ' + this.x + ' - ' + this.y);
    }

    shift(x: number, y: number) {
        this.x += x;
        this.y += y;
        for (const unit of this.units) {
            unit.shift(x, y);
        }
    }
}
