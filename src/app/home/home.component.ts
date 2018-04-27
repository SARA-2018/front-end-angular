import {Component} from '@angular/core';
import * as Lex from 'lexical-parser';
import {error} from 'util';
import {UnitService} from './shared/unit.service';
import {Units} from './unit';
import {MatSnackBar} from '@angular/material';
import {Link} from './d3/models/link';
import {Node} from './d3/models/node';


@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})

export class HomeComponent {

  static URL = 'home';
  nodes: Node[] = [];
  links: Link[] = [];

  constructor(private snackBar: MatSnackBar, private unitService: UnitService) {
    this.addDataGraph();
  }

  addDataGraph () {
    const root: Node = new Node('Java', (3 * 200) / 2, 0);
    const child1: Node = new Node('Funciones', 0, 100);
    const child2: Node = new Node('Variables', 200, 100);
    const child3: Node = new Node('Constantes', 400, 100);
    const child4: Node = new Node('Tipos datos', 600, 100);
    const grandchild1: Node = new Node('boolean', 50, 200);
    const grandchild2: Node = new Node('int', 250, 200);
    const grandchild3: Node = new Node('double', 450, 200);
    this.nodes.push(root);
    this.nodes.push(child1);
    this.nodes.push(child2);
    this.nodes.push(child3);
    this.nodes.push(child4);
    this.nodes.push(grandchild1);
    this.nodes.push(grandchild2);
    this.nodes.push(grandchild3);
    const l1: Link = new Link(root, child1);
    const l2: Link = new Link(root, child2);
    const l3: Link = new Link(root, child3);
    const l4: Link = new Link(root, child4);
    const l5: Link = new Link(child2, grandchild1);
    const l6: Link = new Link(child2, grandchild2);
    const l7: Link = new Link(child2, grandchild3);
    this.links.push(l1);
    this.links.push(l2);
    this.links.push(l3);
    this.links.push(l4);
    this.links.push(l5);
    this.links.push(l6);
    this.links.push(l7);
    console.log('Nodos' + this.nodes.length);
    console.log('Links' + this.links.length);
  }

  onEnter(code: string) {
// You can specify an exact string or a regex for the token
    const tokenMatchers = [
      'new', '#',
      ['integer', /[0-9]+/],
      ['id', /[a-zA-Z][a-zA-Z0-9]*/]
    ];

    const ignorePattern = '[\n\s \t]+';

    const lex = new Lex(code, tokenMatchers, ignorePattern);
    const id = lex.nextToken();
    try {
      if (id['name'] !== 'id') {
        throw error();
      } else {
        const sharp = lex.nextToken();
        if (sharp['name'] !== '#') {
          throw error();
        } else {
          const news = lex.nextToken();
          if (news['name'] === 'new') {
            const unit = new Units().names(id['lexeme']);
            this.createUnit(unit);
          }
        }
      }
    } catch (err) {
      // Error handling
      if (err.code === 'LEXICAL_ERROR') {
        console.log(`\n${err.message}\n`);
        console.log(`Position: ${err.position}`);
        console.log(`Character: ${err.character}`);
        console.log(`Nearby code: ${err.nearbyCode}`);
      } else {
        this.snackBar.open(err, 'X', {
          duration: 8000
        });
      }
    }
  }

  createUnit(body: Object): void {
    this.unitService.create(body).subscribe(data => {
      body = data;
      this.snackBar.open('Creado Correctamente !', 'X', {
        duration: 8000
      });
    });
  }
}
