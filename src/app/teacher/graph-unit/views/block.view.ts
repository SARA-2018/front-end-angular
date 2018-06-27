import { Node } from '../models/node.model';
import { Link } from '../models/link.model';
import { UnitView } from './unit.view';
import { RelationView } from './relation.view';
import { Unit } from '../../../shared/models/unit.model';
import { Block } from '../models/block.model';

export class BlockView {

    private block: Block;
    private x: number;
    private y: number;
    private ascendantUnitView: UnitView;
    private descendantUnitViews: UnitView[] = [];
    private relationViews: RelationView[] = [];

    readonly xSpaceBetweenBlocks = 10;
    readonly ySpaceBetweenBlocks = 60;
    readonly halfSizeBlock = 75;

    constructor(block: Block, ascendantUnitView: UnitView) {
        this.x = 0;
        this.y = 0;
        this.block = block;
        this.ascendantUnitView = ascendantUnitView;
        for (const unit of this.block.getUnits()) {
            const unitView = this.existUnitView(unit);
            if (unitView) {
                this.descendantUnitViews.push(unitView);
            } else {
                this.descendantUnitViews.push(new UnitView(unit, this));
            }
        }
        for (const relation of this.block.getRelations()) {
            this.relationViews.push(new RelationView(relation));
        }
    }

    getDescendantUnitViews(): UnitView[] {
        return this.descendantUnitViews;
    }

    existUnitView(unit: Unit): UnitView {
        return this.ascendantUnitView.existUnitView(unit);
    }

    calculateWidthBlock(): number {
        let width = 0;
        for (const unitView of this.descendantUnitViews) {
            width += unitView.calculateWidthBlock() + this.xSpaceBetweenBlocks;
        }
        return width;
    }

    locate() {
        for (const unitView of this.descendantUnitViews) {
            if (!unitView.isPlaced()) {
                unitView.locate();
            }
        }
        let xShift = 0;
        for (const unitView of this.descendantUnitViews) {
            unitView.shift(xShift, this.ySpaceBetweenBlocks);
            xShift += unitView.calculateWidthBlock();
        }
        this.x = xShift / 2 - this.halfSizeBlock;
        this.y = 0;
    }

    shift(x: number, y: number) {
        this.x += x;
        this.y += y;
        for (const unitView of this.descendantUnitViews) {
            if (unitView.getY() >= this.ascendantUnitView.getY()) {
                unitView.shift(x, y);
            }
        }
    }

    createNode(): Node[] {
        const result = [];
        for (const unitView of this.getDescendantUnitViews()) {
            for (const node of unitView.createNode()) {
                result.push(node);
            }
        }
        return result;
    }

    createLink(topUnitView: UnitView): Link[] {
        const result = [];
        topUnitView.calculateVertexRelation();
        for (let i = 0; i < this.relationViews.length; i++) {
            for (const link of this.relationViews[i].createLink(topUnitView, this.descendantUnitViews[i])) {
                result.push(link);
            }
        }
        return result;
    }

    log(margin: string, unitViewsVisited: UnitView[]) {
        for (const unitView of this.getDescendantUnitViews()) {
            unitView.log(margin, unitViewsVisited);
        }
    }
}
