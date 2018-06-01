export interface UnitView {

    log(margin: string);

    createNode();

    locate();

    shift(x: number, y: number);

    calculateWidthBlock();

    getBlockViews();
}
