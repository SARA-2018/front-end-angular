import { EventEmitter } from '@angular/core';
import { Link } from './link';
import { Node } from './node';
import * as d3 from 'd3';

export class Graph {
  public simulation: d3.Simulation<any, any>;

  public nodes: Node[] = [];
  public links: Link[] = [];

  constructor(nodes, links) {
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
