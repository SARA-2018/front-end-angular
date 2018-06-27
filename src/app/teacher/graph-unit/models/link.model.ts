import { Node } from '../models/node.model';
import { UnitView } from '../views/unit.view';
import { TypeRelation } from './type-relation.enum';

export class Link implements d3.SimulationLinkDatum<Node> {

  source: Node;
  target: Node;

  topUnit: UnitViewImp;
  lowerUnit: UnitViewImp;
  type: string;
  semantics: string;
  cardinalTopUnit: string;
  cardinalLowerUnit: string;

  linkPoints = [];
  relationPoints = [];
  fillRelationColor = 'none';

  readonly lowerUnitUP = 10;
  readonly topUnitDOWN = 25;
  readonly sizeArrowRelation = 10;
  readonly leftCardinal = 10;

  constructor(topUnit: UnitView, lowerUnit: UnitView, type: string, semantics: string,
    cardinalTopUnit: string, cardinalLowerUnit: string) {
    this.topUnit = topUnit;
    this.lowerUnit = lowerUnit;
    this.type = type;
    this.semantics = semantics;
    this.cardinalTopUnit = cardinalTopUnit;
    this.cardinalLowerUnit = cardinalLowerUnit;
    this.generateLink();
    this.generateRelation(this.type);
  }

  generateLink() {
    this.linkPoints.push(this.lowerUnit.getXMiddle());
    this.linkPoints.push(this.lowerUnit.getY());
    this.linkPoints.push(this.lowerUnit.getXMiddle());
    this.linkPoints.push(this.lowerUnit.getY() - this.lowerUnitUP);
    this.linkPoints.push(this.topUnit.getX());
    this.linkPoints.push(this.topUnit.getYSouth() + this.topUnitDOWN);
    this.linkPoints.push(this.topUnit.getX());
    switch (this.type) {
      case TypeRelation.ASSOCIATION:
      case TypeRelation.USE:
        this.linkPoints.push(this.topUnit.getYSouth());
        break;
      case TypeRelation.INHERIT:
        this.linkPoints.push(this.topUnit.getYSouth() + this.sizeArrowRelation);
        break;
      case TypeRelation.COMPOSE:
        this.linkPoints.push(this.topUnit.getYSouth() + (this.sizeArrowRelation * 2));
        break;
    }
  }

  generateRelation(type: string) {
    switch (type) {
      case TypeRelation.ASSOCIATION:
      case TypeRelation.USE:
        this.drawAssociationUP();
        break;
      case TypeRelation.INHERIT:
        this.drawInherit();
        break;
      case TypeRelation.COMPOSE:
        this.drawCompose();
    }
  }

  drawAssociationUP() {
    this.relationPoints.push(this.topUnit.getX() - this.sizeArrowRelation);
    this.relationPoints.push(this.topUnit.getYSouth() + this.sizeArrowRelation);
    this.relationPoints.push(this.topUnit.getX());
    this.relationPoints.push(this.topUnit.getYSouth());
    this.relationPoints.push(this.topUnit.getX() + this.sizeArrowRelation);
    this.relationPoints.push(this.topUnit.getYSouth() + this.sizeArrowRelation);
  }

  drawCompose() {
    this.drawAssociationUP();
    this.relationPoints.push(this.topUnit.getX());
    this.relationPoints.push(this.topUnit.getYSouth() + (this.sizeArrowRelation * 2));
    this.relationPoints.push(this.topUnit.getX() - this.sizeArrowRelation);
    this.relationPoints.push(this.topUnit.getYSouth() + this.sizeArrowRelation);
    this.fillRelationColor = '#FF9A23';
  }

  drawInherit() {
    this.drawAssociationUP();
    this.relationPoints.push(this.topUnit.getX() - this.sizeArrowRelation);
    this.relationPoints.push(this.topUnit.getYSouth() + this.sizeArrowRelation);
  }
}
