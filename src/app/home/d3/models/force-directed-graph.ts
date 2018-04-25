import { EventEmitter } from '@angular/core';
import { Link } from './link';
import { Node } from './node';
import * as d3 from 'd3';

const FORCES = {
  LINKS: 1 / 50,
  COLLISION: 1,
  CHARGE: -1
};

export class ForceDirectedGraph {
  public ticker: EventEmitter<d3.Simulation<Node, Link>> = new EventEmitter();
  public simulation: d3.Simulation<any, any>;

  public nodes: Node[] = [];
  public links: Link[] = [];

  constructor(nodes, links, options: { width, height }) {
   /* const n1: Node = new Node('Padre');
    const n2: Node = new Node('Hijo');
    const nodes2 = [n1, n2];
    const l1: Link = new Link(n1, n2);
    const links2 = [l1];

    console.log('Force-directed');
    this.nodes = nodes2;
    console.log(this.nodes[0].id);
    console.log(this.nodes[0].x + ' / ' + this.nodes[0].y);
    console.log(this.nodes[1].id);
    console.log(this.nodes[1].x + ' / ' + this.nodes[1].y);
    this.links = links2;*/
    this.nodes = nodes;
    this.links = links;

    console.log('Force-directed');
    console.log(this.nodes[0].id);
    console.log(this.nodes[0].x + ' / ' + this.nodes[0].y);
    console.log(this.nodes[1].id);
    console.log(this.nodes[1].x + ' / ' + this.nodes[1].y);

    this.initSimulation(options);
  }

  /*connectNodes(source, target) {
    let link;

    if (!this.nodes[source] || !this.nodes[target]) {
      throw new Error('One of the nodes does not exist');
    }

    link = new Link(source, target);
    this.simulation.stop();
    this.links.push(link);
    this.simulation.alphaTarget(0.3).restart();

    this.initLinks();
  }*/

  /*initNodes() {
    if (!this.simulation) {
      throw new Error('simulation was not initialized yet');
    }

    this.simulation.nodes(this.nodes);
  }*/

  /*initLinks() {
    if (!this.simulation) {
      throw new Error('simulation was not initialized yet');
    }

    this.simulation.force('links',
      d3.forceLink(this.links)
        .id(d => d['id'])
        .strength(FORCES.LINKS)
    );
  }*/

  initSimulation(options) {
    if (!options || !options.width || !options.height) {
      throw new Error('missing options when initializing simulation');
    }

    /** Creating the simulation */
    if (!this.simulation) {
      const ticker = this.ticker;

      this.simulation = d3.forceSimulation()
        .force('charge',
          d3.forceManyBody()
            .strength(d => FORCES.CHARGE * d['r'])
        )
        .force('collide',
          d3.forceCollide()
            .strength(FORCES.COLLISION)
            .radius(d => d['r'] + 5).iterations(2)
        );

      // Connecting the d3 ticker to an angular event emitter
      this.simulation.on('tick', function () {
        ticker.emit(this);
      });

     // this.initNodes();
     // this.initLinks();
    }

    /** Updating the central force of the simulation */
    this.simulation.force('centers', d3.forceCenter(options.width / 2, options.height / 2));

    /** Restarting the simulation internal timer */
    this.simulation.restart();
  }
}
