
import { Link } from '../d3/models/link';
import { UnitViewImp } from './unit.view';
import { TypeRelation } from '../models/type-relation.enum';
import {Relation} from '../models/relation.model';

export class RelationView {

    private relation: Relation;

    readonly xSize = 150;

    constructor(relation: Relation) {
        this.relation = relation;
    }

    createLink(topUnitView: UnitViewImp, lowerUnitView: UnitViewImp): Link[] {
        const links: Link[] = [];
        if ((this.relation.getType() === TypeRelation.INHERIT) || (this.relation.getType() === TypeRelation.COMPOSE)) {
            const relation = new Link(topUnitView, lowerUnitView, this.relation.getType(),
                this.relation.getSemantics(), this.relation.getCardinalTopUnit(),
                this.relation.getCardinalLowerUnit());
            links.push(relation);
            for (const link of lowerUnitView.createLink()) {
                links.push(link);
            }
        }
        return links;
    }
}
