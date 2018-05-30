import { UnitViewImp } from '../../app/teacher/shared/views/unit.view';
import { Unit } from '../../app/teacher/shared/models/unit.model';
import { BlockViewImp } from '../../app/teacher/shared/views/block.view';
import { Block } from '../../app/teacher/shared/models/block.model';

describe('StudentComponent UnitViewImp ', () => {

   /* let unitViewRoot: UnitViewImp;
    let unitViewRoot2: UnitViewImp;
    let unitViewLeaf: UnitViewImp;

    beforeAll(() => {
        unitViewRoot = new UnitViewImp(new Unit('TestUnitRoot'));
        const unitLeaf = new Unit('TestUnitLeaf');
        unitViewLeaf = new UnitViewImp(unitLeaf);
        unitViewRoot.append(new BlockViewImp(new Block(unitLeaf, 'inherit')));

        unitViewRoot2 = new UnitViewImp(new Unit('TestUnitRoot2'));
        const unitMedium = new Unit('TestUnitMedium1');
        unitMedium.appendUnit(unitLeaf, 'inherit');
        unitViewRoot2.append(new BlockViewImp(new Block(unitMedium, 'inherit')));
        unitViewRoot2.append(new BlockViewImp(new Block(new Unit('TestUnitViewImpMedium2'), 'compose')));
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

    it('#shift', () => {
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
    });*/
});
