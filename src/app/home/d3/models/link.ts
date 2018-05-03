import { Node } from './node';

export class Link implements d3.SimulationLinkDatum<Node> {
  // optional - defining optional implementation properties - required for relevant typing assistance
  index?: number;

  // must - defining enforced implementation properties
  source: Node;
  target: Node;
  type: string;
  points = [];

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
  }

  drawAssociation() {
    // Ver de donde viene para rotación
    this.points.push(this.source.x - 10);
    this.points.push(this.source.y + 10);
    this.points.push(this.source.x);
    this.points.push(this.source.y);
    this.points.push(this.source.x + 10);
    this.points.push(this.source.y + 10);
  }

  drawCompose() {
    this.drawAssociation();
    this.points.push(this.source.x);
    this.points.push(this.source.y + 20);
    this.points.push(this.source.x - 10);
    this.points.push(this.source.y + 10);
  }

  drawInherit() {
    this.drawAssociation();
    this.points.push(this.source.x - 10);
    this.points.push(this.source.y + 10);
  }
}
