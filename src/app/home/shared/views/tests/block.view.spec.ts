import { BlockViewImp } from '../block.view';
import { Block } from '../../models/block.model';
import { Unit } from '../../models/unit.model';
import { UnitViewImp } from '../unit.view';

describe('HomeComponent BlockViewImp ', () => {

    let block: BlockViewImp;

    beforeAll(() => {
        block = new BlockViewImp(new Block(new Unit('TestUnit1'), 'inherit'));
        block.appendUnit(new UnitViewImp(new Unit('TestUnit2')));
        block.appendUnit(new UnitViewImp(new Unit('TestUnit3')));
    });

    it ('#calculateWidthBlock' , () => {
        expect(block.calculateWidthBlock()).toBeGreaterThan(0);
    });

    it('#createNode', () => {
        expect(block.createNode().length).toEqual(3);
    });
});
