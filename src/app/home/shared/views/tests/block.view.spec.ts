import { BlockView } from '../block.view';
import { Block } from '../../models/block.model';
import { Unit } from '../../models/unit.model';
import { UnitView } from '../unit.view';

describe('HomeComponent BlockView ', () => {

    let block: BlockView;

    beforeAll(() => {
        block = new BlockView(new Block(new Unit('TestUnit1'), 'inherit'));
        block.appendUnit(new UnitView(new Unit('TestUnit2')));
        block.appendUnit(new UnitView(new Unit('TestUnit3')));
    });

    it ('#calculateWidthBlock' , () => {
        expect(block.calculateWidthBlock()).toBeGreaterThan(0);
    });

    it('#createNode', () => {
        expect(block.createNode().length).toEqual(3);
    });
});
