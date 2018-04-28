import { Node } from './node';

export class Link implements d3.SimulationLinkDatum<Node> {
  // optional - defining optional implementation properties - required for relevant typing assistance
  index?: number;

  // must - defining enforced implementation properties
  source: Node;
  target: Node;
  type: string;
  points: string;
  pointsArray = [];

  constructor(source, target, type?) {
    this.source = source;
    this.target = target;
    this.type = type;

    this.generatePolyline(this.type);
  }

  generatePolyline(type: string) {
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
    this.points = this.pointsArray.toString();
  }

  drawAssociation() {
    // Ver de donde viene para rotación
    this.pointsArray.push(this.source.x - 10);
    this.pointsArray.push(this.source.y + 10);
    this.pointsArray.push(this.source.x);
    this.pointsArray.push(this.source.y);
    this.pointsArray.push(this.source.x + 10);
    this.pointsArray.push(this.source.y + 10);
  }

  drawCompose() {
    this.drawAssociation();
    this.pointsArray.push(this.source.x);
    this.pointsArray.push(this.source.y + 20);
    this.pointsArray.push(this.source.x - 10);
    this.pointsArray.push(this.source.y + 10);
  }

  drawInherit() {
    this.drawAssociation();
    this.pointsArray.push(this.source.x - 10);
    this.pointsArray.push(this.source.y + 10);
  }
}
