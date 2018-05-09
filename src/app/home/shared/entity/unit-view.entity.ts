import { Unit } from './unit.entity';
import { Node } from '../../d3/models/node';
import { Link } from '../../d3/models/link';
import { Relation } from './relation.entity';
import { BlockView } from './block-view.entity';

export class UnitView {

    private unit: Unit;
    private x: number;
    private y: number;
    private xBlock: number;
    private yBlock: number;
    private blockViews: BlockView[] = [];
    private widthBlock: number; // Local
    private xMiddle: number; // TO DO Reconvertir a funcion privada.

    constructor(unit: Unit) {
        this.unit = unit;
        this.x = 0;
        this.y = 0;
        this.xMiddle = 75;
        for (const block of unit.Blocks) {
            this.append(new BlockView(block));
        }
    }

    log(margin: string) {
        console.log(margin + this.Unit.Name);
        for (const block of this.BlockViews) {
            block.log(margin + '   ');
        }
    }

    createNode(): Node[] {
        const result: Node[] = [];
        const root: Node = new Node(this.unit.Name, this.x, this.y);
        console.log('Nodo ' + this.unit.Name);
        result.push(root);
        for (const block of this.blockViews) {
            for (const node of block.createNode()) {
                result.push(node);
            }
        }
        console.log('Unit result ' + result + ' de Nodo ' + this.unit.Name);
        return result;
    }

    append(block: BlockView) {
        this.blockViews.push(block);
    }

    get BlockViews() {
        return this.blockViews;
    }

    get WidthBlock() {
        return this.widthBlock;
    }

    get Unit() {
        return this.unit;
    }

    locate() {
        if (this.blockViews.length === 0) {
            this.x = 0;
            this.y = 0;
            this.xBlock = 0;
            this.yBlock = 0;
            this.widthBlock = 150;
            this.xMiddle = 75;
        } else {
            for (const blockView of this.blockViews) {
                blockView.locate();
            }
            let xShift = 0;
            for (const blockView of this.blockViews) {
                blockView.shift(xShift, 70);
                xShift += blockView.WidthBlock + 10;
            }
            this.x = xShift / 2 - 75;
            this.y = 0;
            this.xBlock = 0;
            this.yBlock = 0;
            this.widthBlock = xShift;
            this.xMiddle = this.x + 75;
        }
    }

    shift(x: number, y: number) {
        this.x += x;
        this.y += y;
        this.xBlock += x;
        this.yBlock += y;
        for (const block of this.blockViews) {
            block.shift(x, y);
        }
    }

    createLink(): Link[] {
        const links: Link[] = [];
        for (const block of this.blockViews) {
            for (const unit of block.UnitViews) {
                const relation = new Link(this, unit, block.Block.Type);
                links.push(relation);
                for (const link of unit.createLink()) {
                    links.push(link);
                }
            }
        }
        return links;
    }
}
