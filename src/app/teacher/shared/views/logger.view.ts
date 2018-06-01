import { UnitViewImp } from './unit.view';

export class LoggerView {

    private unitViewsVisited: UnitViewImp[];
    private rootView: UnitViewImp;

    constructor(rootView: UnitViewImp) {
        this.unitViewsVisited = [];
        this.rootView = rootView;
    }

    log() {
        this.rootView.log(' ', this.unitViewsVisited);
    }
}
