import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Link } from './d3/models/link';
import { Node } from './d3/models/node';
import APP_CONFIG from './data.config';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})

export class HomeComponent implements OnDestroy {

  static URL = 'home';

  nodes: Node[] = [];
  links: Link[] = [];

  constructor() {
    /*const N = APP_CONFIG.N,
          getIndex = number => number - 1;

    /** constructing the nodes array */
    /*for (let i = 1; i <= N; i++) {
      this.nodes.push(new Node(i));
    }*/

    /*for (let i = 1; i <= N; i++) {
      for (let m = 2; i * m <= N; m++) {
        /** increasing connections toll on connecting nodes */
      //  this.nodes[getIndex(i)].linkCount++;
       // this.nodes[getIndex(i * m)].linkCount++;

        /** connecting the nodes before starting the simulation */
       /* this.links.push(new Link(i, i * m));
  }
}*/   
    const n1: Node = new Node('Padre');
    const n2: Node = new Node('Hijo');
    n1.x = 0;
    n1.y = 0;
    n2.x = 0;
    n2.y = 200;
    this.nodes.push(n1);
    this.nodes.push(n2);
    const l1: Link = new Link(n1, n2);
    this.links.push(l1);
    console.log('Nodos' + this.nodes.length);
    console.log('Links' + this.links.length);
  }

  /* EJEMPLO PARA ENRUTAR
  tickets() {
    this.router.navigate([HomeComponent.URL, TicketsComponent.URL]);
  }
  */

  ngOnDestroy(): void {
    // Cerrar todas las subscripciones
  }
}
