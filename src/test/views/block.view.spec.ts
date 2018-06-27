import { BlockView } from '../../app/teacher/graph-unit/views/block.view';
import { Block } from '../../app/teacher/graph-unit/models/block.model';
import { UnitView } from '../../app/teacher/graph-unit/views/unit.view';
import { Unit } from '../../app/shared/models/unit.model';
import { Relation } from '../../app/teacher/graph-unit/models/relation.model';

describe('GraphUnitComponent BlockView ', () => {

    let blockView: BlockView;

    beforeAll(() => {
        const unitAscendant = new Unit ('AscendantUnit');
        const block = new Block(new Relation(new Unit('TestUnit1'), new Unit('TestUnit2'), 'inherit'), unitAscendant);
        blockView = new BlockView(block, new UnitView(unitAscendant));
    });


    it('#calculateWidthBlock', () => {
        expect(blockView.calculateWidthBlock()).toBeGreaterThan(0);
    });

    it('#createNode should create one node', () => {
        expect(blockView.createNode().length).toEqual(1);
    });

});
