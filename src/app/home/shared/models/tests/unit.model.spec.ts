import { TestBed, async } from '@angular/core/testing';
import { Unit } from '../unit.model';

describe('HomeComponent UnitModel', () => {
    // tslint:disable-next-line:prefer-const
    let unit: Unit;

    beforeEach(() => {
        this.unit = new Unit('TestUnit');
    });

    it('appendUnit without semantics', () => {
        this.unit.appendUnit(new Unit('TestUnit2'), 'inherit');
        this.unit.appendUnit(new Unit('TestUnit3'), 'use');
        expect(this.unit.getBlocks().length).toEqual(2);
    });

    it('appendUnit with semantics', () => {
        this.unit.appendUnit(new Unit('TestUnit2'), 'inherit', 'semantics1');
        this.unit.appendUnit(new Unit('TestUnit3'), 'inherit', 'semantics1');
        expect(this.unit.getBlocks().length).toEqual(1);
        this.unit.appendUnit(new Unit('TestUnit4'), 'inherit', 'semantics2');
        expect(this.unit.getBlocks().length).toEqual(2);
    });

    it ('searchBlock without semantics', () => {
        this.unit.appendUnit(new Unit('TestUnit2'), 'inherit');
        this.unit.appendUnit(new Unit('TestUnit3'), 'use');
        expect(this.unit.searchBlock('inherit') === 0);
        expect(this.unit.searchBlock('use') === 1);
    });

    it ('searchBlock with semantics', () => {
        this.unit.appendUnit(new Unit('TestUnit2'), 'inherit', 'semantics1');
        this.unit.appendUnit(new Unit('TestUnit3'), 'use', 'semantics1');
        expect(this.unit.searchBlock('inherit') === 0);
        expect(this.unit.searchBlock('use') === 1);
        this.unit.appendUnit(new Unit('TestUnit4'), 'inherit', 'semantics1');
        expect(this.unit.searchBlock('inherit', 'semantics1') === 0);
    });
});
