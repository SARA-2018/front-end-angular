import { TestBed, async } from '@angular/core/testing';
import { Unit } from './unit.model';

describe('home/shared/models UnitModel', () => {
    // tslint:disable-next-line:prefer-const
    let unit: Unit;

    beforeAll(() => {
        this.unit = new Unit('TestUnit');
    });

    it('getName', () => {
        expect(this.unit.getName()).toEqual('TestUnit');
    });

    it('getBlocks', () => {
        expect(this.unit.getBlocks().length).toEqual(0);
    });
});
