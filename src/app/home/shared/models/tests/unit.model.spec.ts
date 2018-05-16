import { TestBed, async } from '@angular/core/testing';
import { Unit } from '../unit.model';

describe('HomeComponent UnitModel', () => {

    let unit: Unit;

    beforeEach(() => {
        unit = new Unit('TestUnit');
    });

    it('#appendUnit without semantics', () => {
        unit.appendUnit(new Unit('TestUnit2'), 'inherit');
        unit.appendUnit(new Unit('TestUnit3'), 'use');
        expect(unit.getBlocks().length).toEqual(2);
    });

    it('#appendUnit with semantics', () => {
        unit.appendUnit(new Unit('TestUnit2'), 'inherit', 'semantics1');
        unit.appendUnit(new Unit('TestUnit3'), 'inherit', 'semantics1');
        expect(unit.getBlocks().length).toEqual(1);
        unit.appendUnit(new Unit('TestUnit4'), 'inherit', 'semantics2');
        expect(unit.getBlocks().length).toEqual(2);
    });

    it ('#searchBlock without semantics', () => {
        unit.appendUnit(new Unit('TestUnit2'), 'inherit');
        unit.appendUnit(new Unit('TestUnit3'), 'use');
        expect(unit.searchBlock('inherit') === 0);
        expect(unit.searchBlock('use') === 1);
    });

    it ('#searchBlock with semantics', () => {
        unit.appendUnit(new Unit('TestUnit2'), 'inherit', 'semantics1');
        unit.appendUnit(new Unit('TestUnit3'), 'use', 'semantics1');
        expect(unit.searchBlock('inherit') === 0);
        expect(unit.searchBlock('use') === 1);
        unit.appendUnit(new Unit('TestUnit4'), 'inherit', 'semantics1');
        expect(unit.searchBlock('inherit', 'semantics1') === 0);
    });
});
