import { Node } from './node';
import { UnitView } from '../../shared/views/unit.view';

export class Link implements d3.SimulationLinkDatum<Node> {

  source: Node;
  target: Node;
  linkPoints = [];
  sourceHeight: number;

  type: string;
  relationPoints = [];
  fillRelationColor = 'none';

  constructor(source, target, type) {
    this.source = source;
    this.target = target;
    this.type = type;
    this.sourceHeight = this.source.y + 35;
    this.generateLink();
    this.generateRelation(this.type);
  }

  generateLink() {
    this.linkPoints.push(this.target.getXMiddle());
    this.linkPoints.push(this.target.getY());
    this.linkPoints.push(this.target.getXMiddle());
    this.linkPoints.push(this.target.getY() - 10);
    this.linkPoints.push(this.source.getX());
    this.linkPoints.push(this.source.getYSouth() + 25);
    this.linkPoints.push(this.source.getX());
    switch (this.type) {
      case 'association':
      case 'use':
        this.linkPoints.push(this.source.getYSouth());
        break;
      case 'inherit':
        this.linkPoints.push(this.source.getYSouth() + 10);
        break;
      case 'compose':
        this.linkPoints.push(this.source.getYSouth() + 20);
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
    this.relationPoints.push(this.source.getX() - 10);
    this.relationPoints.push(this.source.getYSouth() + 10);
    this.relationPoints.push(this.source.getX());
    this.relationPoints.push(this.source.getYSouth());
    this.relationPoints.push(this.source.getX() + 10);
    this.relationPoints.push(this.source.getYSouth() + 10);
  }

  drawCompose() {
    this.drawAssociation();
    this.relationPoints.push(this.source.getX());
    this.relationPoints.push(this.source.getYSouth() + 20);
    this.relationPoints.push(this.source.getX() - 10);
    this.relationPoints.push(this.source.getYSouth() + 10);
    this.fillRelationColor = '#FF9A23';
  }

  drawInherit() {
    this.drawAssociation();
    this.relationPoints.push(this.source.getX() - 10);
    this.relationPoints.push(this.source.getYSouth() + 10);
  }
}
