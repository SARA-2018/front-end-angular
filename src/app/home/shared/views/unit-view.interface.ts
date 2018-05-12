import { BlockView } from './block.view';
import { Unit } from '../models/unit.model';

export interface UnitViewInterface {

    log(margin: string);

    createNode();

    locate();

    shift(x: number, y: number);

    calculateWidthBlock();
}
