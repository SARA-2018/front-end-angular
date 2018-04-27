import { Injectable, EventEmitter } from '@angular/core';
import { Node, Link, ForceDirectedGraph } from './models';
import * as d3 from 'd3';

@Injectable()
export class D3Service {
  /** This service will provide methods to enable user interaction with elements
    * while maintaining the d3 simulations physics
    */
  constructor() { }

  getForceDirectedGraph(nodes: Node[], links: Link[], options: { width, height }) {
    console.log('d3-service');
    console.log(nodes.length);
    const sg = new ForceDirectedGraph(nodes, links, options);
    return sg;
  }
}
