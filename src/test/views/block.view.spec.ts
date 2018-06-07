import { BlockViewImp } from '../../app/teacher/graph-unit/views/block.view';
import { Block } from '../../app/teacher/graph-unit/models/block.model';
import { UnitViewImp } from '../../app/teacher/graph-unit/views/unit.view';
import { Unit } from '../../app/teacher/graph-unit/models/unit.model';
import { Relation } from '../../app/teacher/graph-unit/models/relation.model';

describe('TeacherComponent-GraphUnit BlockViewImp ', () => {

    let blockView: BlockViewImp;

    beforeAll(() => {
        const unitAscendant = new Unit ('AscendantUnit');
        const block = new Block(new Relation(new Unit('TestUnit1'), new Unit('TestUnit2'), 'inherit'), unitAscendant);
        blockView = new BlockViewImp(block, new UnitViewImp(unitAscendant));
    });

    it('#calculateWidthBlock', () => {
        expect(blockView.calculateWidthBlock()).toBeGreaterThan(0);
    });

    it('#createNode', () => {
        expect(blockView.createNode().length).toEqual(1);
    });
});
