import { Block } from '../../app/teacher/graph-unit/models/block.model';
import { Unit } from '../../app/teacher/graph-unit/models/unit.model';
import { Relation } from '../../app/teacher/graph-unit/models/relation.model';

describe('TeacherComponent-GraphUnit BlockModel', () => {

    let block: Block;

    beforeAll(() => {
        block = new Block(new Relation(new Unit('TestUnit 1'), new Unit('TestUnit 2'), 'use'), new Unit('AscendantUnit'));
    });

    it ('#addRelation should add new unit', () => {
        expect(block.getUnits().length).toEqual(1);
        block.addRelation(new Relation(new Unit('TestUnit 1'), new Unit('TestUnit 3'), 'use'));
        expect(block.getUnits().length).toEqual(2);
    });
});
