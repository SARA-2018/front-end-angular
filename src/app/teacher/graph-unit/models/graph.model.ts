import { Link } from '../models/link.model';
import { Node } from '../models/node.model';
import * as d3 from 'd3';

export class Graph {
  public simulation: d3.Simulation<any, any>;

  public nodes: Node[] = [];
  public links: Link[] = [];

  constructor(nodes: Node[], links: Link[]) {
    this.nodes = nodes;
    this.links = links;
    this.initSimulation();
  }

  initSimulation() {
    if (!this.simulation) {
      this.simulation = d3.forceSimulation();
    }
    this.simulation.restart();
  }
}
