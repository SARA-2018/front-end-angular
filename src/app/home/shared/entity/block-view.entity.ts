import { Node } from '../../d3/models/node';
import { Link } from '../../d3/models/link';
import { RelationEntity } from './relation.entity';
import { UnitViewEntity } from './unit-view.entity';

export class BlockViewEntity {

    type: string;
    semantics: string;
    units: UnitViewEntity[] = [];

    x: number;
    y: number;
    widthBlock: number;
    heightBlock: number;

    constructor(type: string, unit: UnitViewEntity) {
        this.x = 0;
        this.y = 0;
        this.type = type;
        this.units.push(unit);
    }

    appendUnit(unit: UnitViewEntity) {
        this.units.push(unit);
    }

    // Geters y seters
    getType() {
        return this.type;
    }

    get Units() {
        return this.units;
    }

    locate() {
        for (const unit of this.units) {
            unit.locate();
            this.widthBlock += unit.widthBlock;
        }
        let xShift = 0;
        for (const unit of this.units) {
            unit.shift(xShift, 70);
            xShift += unit.widthBlock + 10;
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
