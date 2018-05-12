import { UnitView } from './unit.view';

export interface BlockViewInterface {

    log(margin: string);

    createNode();

    locate();

    shift(x: number, y: number);

    getUnitViews();

    getBlock();

    calculateWidthBlock();
}
