import { Node } from './node';

export class Link implements d3.SimulationLinkDatum<Node> {
  // optional - defining optional implementation properties - required for relevant typing assistance
  index?: number;

  // must - defining enforced implementation properties
  source: Node;
  target: Node;
  source_middle: number;
  source_height: number;
  target_middle: number;

  type: string;
  points = [];

  constructor(source, target, type?) {
    this.source = source;
    this.target = target;
    this.type = type;
    this.centerLink();
    this.generatePolyline(this.type);
  }

  centerLink() {
    this.source_middle = this.source.x + 75;
    this.source_height = this.source.y + 35;
    this.target_middle = this.target.x + 75;
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
