export interface BlockView {

    log(margin: string);

    createNode();

    locate();

    shift(x: number, y: number);

    getUnitViews();

    getBlock();

    calculateWidthBlock();
}
