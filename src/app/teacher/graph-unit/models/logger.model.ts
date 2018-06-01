import { Unit } from './unit.model';

export class Logger {

    private unitsVisited: Unit[];
    private root: Unit;

    constructor(root: Unit) {
        this.unitsVisited = [];
        this.root = root;
    }

    log() {
        this.root.log(' ', this.unitsVisited);
    }
}
