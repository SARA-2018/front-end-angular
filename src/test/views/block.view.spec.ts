import { BlockViewImp } from '../../app/teacher/shared/views/block.view';
import { Block } from '../../app/teacher/shared/models/block.model';
import { UnitViewImp } from '../../app/teacher/shared/views/unit.view';
import { Unit } from '../../app/teacher/shared/models/unit.model';

describe('StudentComponent BlockViewImp ', () => {

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
