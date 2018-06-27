import { UnitView } from './unit.view';

export class LoggerView {

    private unitViewsVisited: UnitView[];
    private rootView: UnitView;

    constructor(rootView: UnitView) {
        this.unitViewsVisited = [];
        this.rootView = rootView;
    }

    log() {
        this.rootView.log(' ', this.unitViewsVisited);
    }
}
