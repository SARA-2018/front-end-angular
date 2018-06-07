import { UnitViewImp } from '../../app/teacher/graph-unit/views/unit.view';
import { Unit } from '../../app/teacher/graph-unit/models/unit.model';
import { BlockViewImp } from '../../app/teacher/graph-unit/views/block.view';
import { Block } from '../../app/teacher/graph-unit/models/block.model';
import { Relation } from '../../app/teacher/graph-unit/models/relation.model';
import { RelationView } from '../../app/teacher/graph-unit/views/relation.view';

describe('TeacherComponent-GraphUnit UnitViewImp ', () => {

    let unitViewRoot: UnitViewImp;
    let unitViewLeaf: UnitViewImp;

    beforeEach(() => {
        const unitRoot = new Unit('TestUnitRoot');
        const unitLeaf = new Unit('TestUnitLeaf');
        const relation = new Relation(unitRoot, unitLeaf, 'inherit');
        const relation2 = new Relation(unitRoot, new Unit('TestUnitLeaf2'), 'inherit');
        unitViewRoot = new UnitViewImp(unitRoot);

        unitViewLeaf = new UnitViewImp(unitLeaf);

       /* const unitRoot2 = new Unit('TestUnitRoot2');
        unitViewRoot2 = new UnitViewImp(unitRoot2);
        const unitMedium = new Unit('TestUnitMedium');
        const relation2 = new RelationView(new Relation(unitRoot2, unitMedium, 'inherit'));
        const relation3 = new RelationView(new Relation(unitMedium, unitLeaf, 'compose'));
*/
    });

    it('#locate leaf', () => {
        unitViewLeaf.locate();
        expect(unitViewLeaf.getX()).toEqual(0);
        expect(unitViewLeaf.getY()).toEqual(0);
    });

   /* it('#locate root', () => {
        unitViewRoot.locate();
        unitViewRoot.getBlockViews()[0].getDescendantUnitViews()[0].getY() );
        expect(unitViewRoot.getX()).toBeGreaterThan(0);
    });*/

    it('#calculateWidthBlock', () => {
        // expect(unitViewRoot.calculateWidthBlock()).toBeGreaterThan(160);
        expect(unitViewLeaf.calculateWidthBlock()).toEqual(160);
    });

    it('#shift', () => {
        unitViewLeaf.shift(10, 10);
        expect(unitViewLeaf.getX()).toEqual(10);
        expect(unitViewLeaf.getY()).toEqual(10);
    });

    it('#createNode', () => {
        expect(unitViewLeaf.createNode().length).toEqual(1);
       // expect(unitViewRoot.createNode().length).toEqual(3);
    });

    it('#createLink', () => {
       // expect(unitViewRoot.createLink().length).toEqual(1);
        expect(unitViewLeaf.createLink().length).toEqual(0);
    });
});
