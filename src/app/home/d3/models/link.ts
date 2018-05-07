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
  link_points = [];

  type: string;
  relation_points = [];
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
    this.source_middle = this.source.x + 75;
    this.source_height = this.source.y + 35;
    this.target_middle = this.target.x + 75;
  }

  generateLink() {
    this.link_points.push(this.target_middle);
    this.link_points.push(this.target.y);
    this.link_points.push(this.target_middle);
    this.link_points.push(this.target.y - 10);
    this.link_points.push(this.source_middle);
    this.link_points.push(this.source_height + 25);
    this.link_points.push(this.source_middle);
    switch (this.type) {
      case 'association' : {
        this.link_points.push(this.source_height);
        break;
      }
      case 'use' : {
        this.link_points.push(this.source_height);
        break;
      }
      case 'inherit' : {
        this.link_points.push(this.source_height + 10);
        break;
      }
      case 'compose' : {
        this.link_points.push(this.source_height + 20);
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
    this.relation_points.push(this.source_middle - 10);
    this.relation_points.push(this.source_height + 10);
    this.relation_points.push(this.source_middle);
    this.relation_points.push(this.source_height);
    this.relation_points.push(this.source_middle + 10);
    this.relation_points.push(this.source_height + 10);
  }

  drawCompose() {
    this.drawAssociation();
    this.relation_points.push(this.source_middle);
    this.relation_points.push(this.source_height + 20);
    this.relation_points.push(this.source_middle - 10);
    this.relation_points.push(this.source_height + 10);
    this.relationColor = '#FF9A23';
  }

  drawInherit() {
    this.drawAssociation();
    this.relation_points.push(this.source_middle - 10);
    this.relation_points.push(this.source_height + 10);
  }
}
