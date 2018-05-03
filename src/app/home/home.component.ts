import {Component, OnInit} from '@angular/core';
import * as Lex from 'lexical-parser';
import {error} from 'util';
import {UnitService} from './shared/unit.service';
import {Units} from './unit';
import {MatSnackBar} from '@angular/material';
import {Link} from './d3/models/link';
import {Node} from './d3/models/node';
import {FormControl} from '@angular/forms';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})

export class HomeComponent {

  static URL = 'home';
  nodes: Node[] = [];
  links: Link[] = [];

  searchTerm = new FormControl();
  searchResult: Observable<string[]>;
  options = [];

  constructor(private snackBar: MatSnackBar, private unitService: UnitService) {
    this.addDataGraph();
    this.syncromized();
  }

  /* EJEMPLO PARA ENRUTAR
  tickets() {
    this.router.navigate([HomeComponent.URL, TicketsComponent.URL]);
  }
  */

  addDataGraph() {

    const n1: Node = new Node('Animales', 200, 10);
    const n2: Node = new Node('Perro');
    n2.x = 10;
    n2.y = 200;
    const n3: Node = new Node('Gato', 200, 200);
    const n4: Node = new Node('Pájaro', 400, 200);
    const n5: Node = new Node('Caballo', 600, 200);

    this.nodes.push(n1);
    this.nodes.push(n2);
    this.nodes.push(n3);
    this.nodes.push(n4);
    this.nodes.push(n5);
    const l1: Link = new Link(n1, n2, 'compose');
    const l2: Link = new Link(n1, n3);
    const l3: Link = new Link(n1, n4);
    const l4: Link = new Link(n1, n5);
    this.links.push(l1);
    this.links.push(l2);
    this.links.push(l3);
    this.links.push(l4);

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
      if (id['type'] !== 'id') {
        throw error();
      } else {
        const sharp = lex.nextToken();
        if (sharp['type'] !== '#') {
          throw error();
        } else {
          const news = lex.nextToken();
          if (news['type'] === 'new') {
            const unit = new Units().names(id['value']);
            this.createUnit(unit);
          } else {
            throw error();
          }
        }
      }
    } catch (err) {
      // Error handling
      if (err.code === 'LEXICAL_ERROR') {
        this.snackBar.open(err.message, 'X');
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

  syncromized() {
    this.searchResult = this.searchTerm.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val))
      );
  }

  filter(val: string): string[] {
    if (val !== '') {
      this.unitService.filter(val).subscribe(data => {
        this.options = [data['name'] + ' \t  /hijo de /padre / hijo'];
      });
      return this.options.filter(option =>
        option.toLowerCase().indexOf(val.toLowerCase()) === 0);
    }
  }
}
