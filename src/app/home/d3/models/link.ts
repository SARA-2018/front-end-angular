import { Node } from './node';

export class Link implements d3.SimulationLinkDatum<Node> {
  // optional - defining optional implementation properties - required for relevant typing assistance
  index?: number;

  // must - defining enforced implementation properties
  source: Node;
  target: Node;
  sourceMiddle: number;
  sourceHeight: number;
  targetMiddle: number;
  linkPoints = [];

  type: string;
  relationPoints = [];
  relationColor = 'none';

  constructor(source, target, type?) {
    this.source = source;
    this.target = target;
    this.type = type;
    this.centerLink();
    this.generateLink();
    this.generateRelation(this.type);
  }

  centerLink() {
    this.sourceMiddle = this.source.x + 75;
    this.sourceHeight = this.source.y + 35;
    this.targetMiddle = this.target.x + 75;
  }

  generateLink() {
    this.linkPoints.push(this.targetMiddle);
    this.linkPoints.push(this.target.y);
    this.linkPoints.push(this.targetMiddle);
    this.linkPoints.push(this.target.y - 10);
    this.linkPoints.push(this.sourceMiddle);
    this.linkPoints.push(this.sourceHeight + 25);
    this.linkPoints.push(this.sourceMiddle);
    switch (this.type) {
      case 'association' : {
        this.linkPoints.push(this.sourceHeight);
        break;
      }
      case 'use' : {
        this.linkPoints.push(this.sourceHeight);
        break;
      }
      case 'inherit' : {
        this.linkPoints.push(this.sourceHeight + 10);
        break;
      }
      case 'compose' : {
        this.linkPoints.push(this.sourceHeight + 20);
        break;
      }
    }
  }

  generateRelation(type: string) {
    switch (type) {
      case 'association' : {
        this.drawAssociation();
        break;
      }
      case 'use' : {
        this.drawAssociation();
        break;
      }
      case 'inherit' : {
        this.drawInherit();
        break;
      }
      case 'compose' : {
        this.drawCompose();
      }
    }
  }

  drawAssociation() {
    this.relationPoints.push(this.sourceMiddle - 10);
    this.relationPoints.push(this.sourceHeight + 10);
    this.relationPoints.push(this.sourceMiddle);
    this.relationPoints.push(this.sourceHeight);
    this.relationPoints.push(this.sourceMiddle + 10);
    this.relationPoints.push(this.sourceHeight + 10);
  }

  drawCompose() {
    this.drawAssociation();
    this.relationPoints.push(this.sourceMiddle);
    this.relationPoints.push(this.sourceHeight + 20);
    this.relationPoints.push(this.sourceMiddle - 10);
    this.relationPoints.push(this.sourceHeight + 10);
    this.relationColor = '#FF9A23';
  }

  drawInherit() {
    this.drawAssociation();
    this.relationPoints.push(this.sourceMiddle - 10);
    this.relationPoints.push(this.sourceHeight + 10);
  }
}
