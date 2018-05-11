import { Node } from './node';

export class Link implements d3.SimulationLinkDatum<Node> {

  source: Node;
  target: Node;
  linkPoints = [];
  sourceHeight: number;

  type: string;
  relationPoints = [];
  relationColor = 'none';

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
    this.linkPoints.push(this.target.y);
    this.linkPoints.push(this.target.getXMiddle());
    this.linkPoints.push(this.target.y - 10);
    this.linkPoints.push(this.source.getXMiddle());
    this.linkPoints.push(this.sourceHeight + 25);
    this.linkPoints.push(this.source.getXMiddle());
    switch (this.type) {
      case 'association':
      case 'use':
        this.linkPoints.push(this.sourceHeight);
        break;
      case 'inherit':
        this.linkPoints.push(this.sourceHeight + 10);
        break;
      case 'compose':
        this.linkPoints.push(this.sourceHeight + 20);
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
    this.relationPoints.push(this.source.getXMiddle() - 10);
    this.relationPoints.push(this.sourceHeight + 10);
    this.relationPoints.push(this.source.getXMiddle());
    this.relationPoints.push(this.sourceHeight);
    this.relationPoints.push(this.source.getXMiddle() + 10);
    this.relationPoints.push(this.sourceHeight + 10);
  }

  drawCompose() {
    this.drawAssociation();
    this.relationPoints.push(this.source.getXMiddle());
    this.relationPoints.push(this.sourceHeight + 20);
    this.relationPoints.push(this.source.getXMiddle() - 10);
    this.relationPoints.push(this.sourceHeight + 10);
    this.relationColor = '#FF9A23';
  }

  drawInherit() {
    this.drawAssociation();
    this.relationPoints.push(this.source.getXMiddle() - 10);
    this.relationPoints.push(this.sourceHeight + 10);
  }
}
