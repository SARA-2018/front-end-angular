import { Relation } from '../models/relation.model';
import { Link } from '../../d3/models/link';
import { UnitViewImp } from './unit.view';

export class RelationView {

    private relation: Relation;

    readonly xSize = 150;

    constructor(relation: Relation) {
        this.relation = relation;
    }

    createLink(topUnitView: UnitViewImp): Link[] {
        const links: Link[] = [];
        const nodeDivisionForLink = this.xSize / (topUnitView.getBlockViews().length + 1);
        for (const blockView of topUnitView.getBlockViews()) {
            topUnitView.setX(topUnitView.getX() + nodeDivisionForLink);
            for (const unit of blockView.getUnitViews()) {
                const relation = new Link(topUnitView, unit, this.relation.getType(),
                    this.relation.getSemantics(), this.relation.getCardinalTopUnit(),
                    this.relation.getCardinalLowerUnit());
                links.push(relation);
                for (const link of unit.createLink()) {
                    links.push(link);
                }
            }
        }
        console.log('Return createLink relation ' + links.length);
        return links;
    }
}
