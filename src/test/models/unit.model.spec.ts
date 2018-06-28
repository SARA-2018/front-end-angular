import { Unit } from '../../app/shared/models/unit.model';
import { Relation } from '../../app/teacher/graph-unit/models/relation.model';

describe('GraphUnitComponent UnitModel', () => {

    let unit: Unit;

    beforeEach(() => {
        unit = new Unit('TestUnit');
    });

    it('#addRelation without semantics', () => {
        unit.addRelation(new Relation(unit, new Unit('TestUnit2'), 'inherit'));
        unit.addRelation(new Relation(unit, new Unit('TestUnit3'), 'use'));
        expect(unit.getBlocks().length).toEqual(2);
    });

    it('#addRelation with semantics', () => {
        unit.addRelation(new Relation(unit, new Unit('TestUnit2'), 'inherit', 'semantics1'));
        unit.addRelation(new Relation(unit, new Unit('TestUnit3'), 'inherit', 'semantics1'));
        expect(unit.getBlocks().length).toEqual(1);
        unit.addRelation(new Relation(unit, new Unit('TestUnit4'), 'inherit', 'semantics2'));
        expect(unit.getBlocks().length).toEqual(2);
    });

});
