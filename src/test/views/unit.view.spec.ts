import { UnitView } from '../../app/teacher/graph-unit/views/unit.view';
import { Unit } from '../../app/shared/models/unit.model';

describe('GraphUnitComponent UnitView ', () => {

    let unitViewLeaf: UnitView;

    beforeEach(() => {
        unitViewLeaf = new UnitView(new Unit('UnitLeaf'));
    });

    it('#locate leaf should locate in (0,0)', () => {
        unitViewLeaf.locate();
        expect(unitViewLeaf.getX()).toEqual(0);
        expect(unitViewLeaf.getY()).toEqual(0);
    });

    it('#calculateWidthBlock leaf should be XSize + 10,', () => {
        expect(unitViewLeaf.calculateWidthBlock()).toEqual(unitViewLeaf.getXSize() + 10);
    });

    it('#shift leaf (10,10) should locate (10,10)', () => {
        unitViewLeaf.shift(10, 10);
        expect(unitViewLeaf.getX()).toEqual(10);
        expect(unitViewLeaf.getY()).toEqual(10);
    });

    it('#createNode leaf should create one node', () => {
        expect(unitViewLeaf.createNode().length).toEqual(1);
    });

    it('#createLink leaf should not create a link', () => {
        expect(unitViewLeaf.createLink().length).toEqual(0);
    });

    it('#isLeaf leaf should be true', () => {
        expect(unitViewLeaf.isLeaf()).toBeTruthy();
    });

    it('#unitsLocatedBelow leaf should be false', () => {
        expect(unitViewLeaf.unitsLocatedBelow()).toBeFalsy();
    });

});
