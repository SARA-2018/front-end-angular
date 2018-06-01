import { UnitViewImp } from './unit.view';

export interface BlockView {

    log(margin: string);

    createNode();

    locate();

    shift(x: number, y: number);

    getUnitViews();

    getRelationViews();

    getBlock();

    calculateWidthBlock();

    createLink(topUnitView: UnitViewImp);
}
