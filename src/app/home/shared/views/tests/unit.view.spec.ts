import { UnitView } from '../unit.view';
import { Unit } from '../../models/unit.model';
import { BlockView } from '../block.view';
import { Block } from '../../models/block.model';

describe('HomeComponent UnitView ', () => {

    let unitViewRoot: UnitView;
    let unitViewRoot2: UnitView;
    let unitViewLeaf: UnitView;

    beforeAll(() => {
        unitViewRoot = new UnitView(new Unit('TestUnitRoot'));
        const unitLeaf = new Unit('TestUnitLeaf');
        unitViewLeaf = new UnitView(unitLeaf);
        unitViewRoot.append(new BlockView(new Block(unitLeaf, 'inherit')));

        unitViewRoot2 = new UnitView(new Unit('TestUnitRoot2'));
        const unitMedium = new Unit ('TestUnitMedium1');
        unitMedium.appendUnit(unitLeaf, 'inherit');
        unitViewRoot2.append(new BlockView(new Block(unitMedium, 'inherit')));
        unitViewRoot2.append(new BlockView(new Block(new Unit('TestUnitViewMedium2'), 'compose')));
    });

    it('#locate leaf', () => {
        unitViewLeaf.locate();
        expect(unitViewLeaf.getX()).toEqual(0);
        expect(unitViewLeaf.getY()).toEqual(0);
    });

    it('#locate root', () => {
        unitViewRoot.locate();
        expect(unitViewRoot.getX()).toBeGreaterThan(0);
    });

    it('#calculateWidthBlock', () => {
        expect(unitViewRoot2.calculateWidthBlock()).toBeGreaterThan(160);
        expect(unitViewLeaf.calculateWidthBlock()).toEqual(160);
    });

    it('#shift' , () => {
        unitViewLeaf.shift(10, 10);
        expect(unitViewLeaf.getX()).toEqual(10);
        expect(unitViewLeaf.getY()).toEqual(10);
    });

    it('#createNode', () => {
        expect(unitViewRoot.createNode().length).toEqual(2);
        expect(unitViewRoot2.createNode().length).toEqual(4);
    });

    it('#createLink', () => {
        expect(unitViewRoot.createLink().length).toEqual(1);
        expect(unitViewRoot2.createLink().length).toEqual(3);
    });
});
