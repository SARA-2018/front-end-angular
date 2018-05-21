import { BlockViewImp } from '../../app/home/shared/views/block.view';
import { UnitViewImp } from '../../app/home/shared/views/unit.view';
import { Block } from '../../app/home/shared/models/block.model';
import { Unit } from '../../app/home/shared/models/unit.model';


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
