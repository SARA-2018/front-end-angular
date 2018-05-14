import { Node } from './node';
import { UnitView } from '../../shared/views/unit.view';

export class Link implements d3.SimulationLinkDatum<Node> {

  source: Node;
  target: Node;

  topUnit: UnitView;
  lowerUnit: UnitView;
  semantics: string;
  type: string;
  linkPoints = [];
  relationPoints = [];
  fillRelationColor = 'none';

  readonly lowerUnitUP = 10;
  readonly topUnitDOWN = 25;
  readonly ten = 10;
  readonly twenty = 20;

  constructor(topUnit: UnitView, lowerUnit: UnitView, type, semantics?) {
    this.topUnit = topUnit;
    this.lowerUnit = lowerUnit;
    this.type = type;
    this.semantics = semantics;
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
      case 'association':
      case 'use':
        this.linkPoints.push(this.topUnit.getYSouth());
        break;
      case 'inherit':
        this.linkPoints.push(this.topUnit.getYSouth() + this.ten);
        break;
      case 'compose':
        this.linkPoints.push(this.topUnit.getYSouth() + this.twenty);
        break;
    }
  }

  generateRelation(type: string) {
    switch (type) {
      case 'association':
      case 'use':
        this.drawAssociation();
        break;
      case 'inherit':
        this.drawInherit();
        break;
      case 'compose':
        this.drawCompose();
    }
  }

  drawAssociation() {
    this.relationPoints.push(this.topUnit.getX() - this.ten);
    this.relationPoints.push(this.topUnit.getYSouth() + this.ten);
    this.relationPoints.push(this.topUnit.getX());
    this.relationPoints.push(this.topUnit.getYSouth());
    this.relationPoints.push(this.topUnit.getX() + this.ten);
    this.relationPoints.push(this.topUnit.getYSouth() + this.ten);
  }

  drawCompose() {
    this.drawAssociation();
    this.relationPoints.push(this.topUnit.getX());
    this.relationPoints.push(this.topUnit.getYSouth() + this.twenty);
    this.relationPoints.push(this.topUnit.getX() - this.ten);
    this.relationPoints.push(this.topUnit.getYSouth() + this.ten);
    this.fillRelationColor = '#FF9A23';
  }

  drawInherit() {
    this.drawAssociation();
    this.relationPoints.push(this.topUnit.getX() - this.ten);
    this.relationPoints.push(this.topUnit.getYSouth() + this.ten);
  }
}
