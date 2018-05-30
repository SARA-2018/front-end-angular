import { Relation } from '../models/relation.model';
import { Link } from '../../d3/models/link';
import { UnitViewImp } from './unit.view';

export class RelationView {

    private relation: Relation;

    readonly xSize = 150;

    constructor(relation: Relation) {
        this.relation = relation;
    }

    createLink(topUnitView: UnitViewImp, lowerUnitView: UnitViewImp): Link[] {
        const links: Link[] = [];
        const relation = new Link(topUnitView, lowerUnitView, this.relation.getType(),
            this.relation.getSemantics(), this.relation.getCardinalTopUnit(),
            this.relation.getCardinalLowerUnit());
        links.push(relation);
        for (const link of lowerUnitView.createLink()) {
            links.push(link);
        }
        return links;
    }
}
