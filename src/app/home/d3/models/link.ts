import { Node } from './node';
import { UnitView } from '../../shared/views/unit.view';

export class Link implements d3.SimulationLinkDatum<Node> {

  source: Node;
  target: Node;
  linkPoints = [];

  type: string;
  relationPoints = [];
  fillRelationColor = 'none';

  readonly targetUP = 10;
  readonly sourceDOWN = 25;
  readonly ten = 10;
  readonly twenty = 20;

  constructor(source, target, type) {
    this.source = source;
    this.target = target;
    this.type = type;
    this.generateLink();
    this.generateRelation(this.type);
  }

  generateLink() {
    this.linkPoints.push(this.target.getXMiddle());
    this.linkPoints.push(this.target.getY());
    this.linkPoints.push(this.target.getXMiddle());
    this.linkPoints.push(this.target.getY() - this.targetUP);
    this.linkPoints.push(this.source.getX());
    this.linkPoints.push(this.source.getYSouth() + this.sourceDOWN);
    this.linkPoints.push(this.source.getX());
    switch (this.type) {
      case 'association':
      case 'use':
        this.linkPoints.push(this.source.getYSouth());
        break;
      case 'inherit':
        this.linkPoints.push(this.source.getYSouth() + this.ten);
        break;
      case 'compose':
        this.linkPoints.push(this.source.getYSouth() + this.twenty);
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
    this.relationPoints.push(this.source.getX() - this.ten);
    this.relationPoints.push(this.source.getYSouth() + this.ten);
    this.relationPoints.push(this.source.getX());
    this.relationPoints.push(this.source.getYSouth());
    this.relationPoints.push(this.source.getX() + this.ten);
    this.relationPoints.push(this.source.getYSouth() + this.ten);
  }

  drawCompose() {
    this.drawAssociation();
    this.relationPoints.push(this.source.getX());
    this.relationPoints.push(this.source.getYSouth() + this.twenty);
    this.relationPoints.push(this.source.getX() - this.ten);
    this.relationPoints.push(this.source.getYSouth() + this.ten);
    this.fillRelationColor = '#FF9A23';
  }

  drawInherit() {
    this.drawAssociation();
    this.relationPoints.push(this.source.getX() - this.ten);
    this.relationPoints.push(this.source.getYSouth() + this.ten);
  }
}
