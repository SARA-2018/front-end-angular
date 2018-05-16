import { Block } from '../block.model';
import { Unit } from '../unit.model';

describe('HomeComponent BlockModel', () => {

    // tslint:disable-next-line:prefer-const
    let block: Block;

    beforeEach(() => {
        this.block = new Block(new Unit('TestUnit'), 'inherit');
    });

    it ('appendUnit', () => {
        expect(this.block.getUnits().length).toEqual(1);
        this.block.appendUnit(new Unit('TestUnit2'));
        expect(this.block.getUnits().length).toEqual(2);
    });
});
