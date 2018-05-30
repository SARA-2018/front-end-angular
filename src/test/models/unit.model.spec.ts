import { TestBed, async } from '@angular/core/testing';
import { Unit } from '../../app/teacher/shared/models/unit.model';
import { Relation } from '../../app/teacher/shared/models/relation.model';

describe('StudentComponent UnitModel', () => {

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

    it ('#searchBlock without semantics', () => {
        unit.addRelation(new Relation(unit, new Unit('TestUnit2'), 'inherit'));
        unit.addRelation(new Relation(unit, new Unit('TestUnit3'), 'use'));
        expect(unit.searchBlock('inherit') === 0);
        expect(unit.searchBlock('use') === 1);
    });

    it ('#searchBlock with semantics', () => {
        unit.addRelation(new Relation(unit, new Unit('TestUnit2'), 'inherit', 'semantics1'));
        unit.addRelation(new Relation(unit, new Unit('TestUnit3'), 'use', 'semantics1'));
        expect(unit.searchBlock('inherit') === 0);
        expect(unit.searchBlock('use') === 1);
        unit.addRelation(new Relation(unit, new Unit('TestUnit3'), 'inherit', 'semantics1'));
        expect(unit.searchBlock('inherit', 'semantics1') === 0);
    });
});
