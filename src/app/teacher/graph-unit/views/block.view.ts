import { Node } from '../d3/models/node';
import { Link } from '../d3/models/link';
import { UnitViewImp } from './unit.view';
import { RelationView } from './relation.view';
import { Unit } from '../models/unit.model';
import { Block } from '../models/block.model';

export class BlockViewImp {

    private block: Block;
    private x: number;
    private y: number;
    private ascendantUnitView: UnitViewImp;
    private descendantUnitViews: UnitViewImp[] = [];
    private relationViews: RelationView[] = [];

    readonly xSpaceBetweenBlocks = 10;
    readonly ySpaceBetweenBlocks = 60;
    readonly halfSizeBlock = 75;

    constructor(block: Block, ascendantUnitView: UnitViewImp) {
        this.x = 0;
        this.y = 0;
        this.block = block;
        this.ascendantUnitView = ascendantUnitView;
        for (const unit of this.block.getUnits()) {
            const unitView = this.existUnitView(unit);
            if (unitView) {
                this.descendantUnitViews.push(unitView);
            } else {
                this.descendantUnitViews.push(new UnitViewImp(unit, this));
            }
        }
        for (const relation of this.block.getRelations()) {
            this.relationViews.push(new RelationView(relation));
        }
    }

    existUnitView(unit: Unit): UnitViewImp {
        return this.ascendantUnitView.existUnitView(unit);
    }

    getBlock(): Block {
        return this.block;
    }

    getRelationViews(): RelationView[] {
        return this.relationViews;
    }

    getDescendantUnitViews(): UnitViewImp[] {
        return this.descendantUnitViews;
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

    createLink(topUnitView: UnitViewImp): Link[] {
        const result = [];
        topUnitView.calculateVertexRelation();
        for (let i = 0; i < this.relationViews.length; i++) {
            for (const link of this.relationViews[i].createLink(topUnitView, this.descendantUnitViews[i])) {
                result.push(link);
            }
        }
        return result;
    }

    log(margin: string, unitViewsVisited: UnitViewImp[]) {
        for (const unitView of this.getDescendantUnitViews()) {
            unitView.log(margin, unitViewsVisited);
        }
    }
}
