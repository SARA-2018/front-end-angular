import { Block } from '../block.model';
import { Unit } from '../unit.model';

describe('HomeComponent BlockModel', () => {

    let block: Block;

    beforeAll(() => {
        block = new Block(new Unit('TestUnit'), 'inherit');
    });

    it ('#appendUnit should add new unit', () => {
        expect(block.getUnits().length).toEqual(1);
        block.appendUnit(new Unit('TestUnit2'));
        expect(block.getUnits().length).toEqual(2);
    });
});