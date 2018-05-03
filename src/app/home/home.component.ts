import {Component, OnInit} from '@angular/core';
import * as Lex from 'lexical-parser';
import {error} from 'util';
import {UnitService} from './shared/services/unit.service';
import {MatSnackBar} from '@angular/material';
import {Link} from './d3/models/link';
import {Node} from './d3/models/node';
import {FormControl} from '@angular/forms';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import {Observable} from 'rxjs/Observable';
import { Unit } from './shared/models/unit.model';


@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit {

  static URL = 'home';
  nodes: Node[] = [];
  links: Link[] = [];
  units: Unit[];

  searchTerm = new FormControl();
  searchResult: Observable<string[]>;
  options = [];

  constructor(private snackBar: MatSnackBar, private unitService: UnitService) {
  }

  ngOnInit(): void {
    this.synchronizedGraph();
    this.synchronizedSearch();
  }

  // child1: Node = new Node('Funciones', 0, 100);
  /* EJEMPLO PARA ENRUTAR
  tickets() {
    this.router.navigate([HomeComponent.URL, TicketsComponent.URL]);
  }
  */

  synchronizedGraph() {
    this.unitService.getAll().subscribe(data => {
      this.units = data;
      this.addDataGraph();
    });
  }
  addDataGraph() {

    /*const n1: Node = new Node('Animales', 200, 10);
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
    this.links.push(l4);*/

    let x = 10;
    for (const unit of this.units) {
      console.log(unit.name);
      this.nodes.push(new Node(unit.name, x, 10));
      x = x + 200;
    }

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
            let unit: Unit;
            unit = { name: id['lexeme'] };
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

  createUnit(unit: Unit): void {
    this.unitService.create(unit).subscribe(data => {
      this.snackBar.open('Creado Correctamente !', 'X', {
        duration: 8000
      });
      this.synchronizedGraph();
    });
  }

  synchronizedSearch() {
    this.searchResult = this.searchTerm.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val))
      );
  }

  filter(val: string): string[] {
    if (val !== '') {
      this.unitService.filter(val).subscribe(data => {
        for (let i = 0 ; i < data.length ; i++) {
          this.options.push( [data[i].name + ' --- ' + data[i].topUnit.name] + '' );
        }
      });
      /*return this.options.filter(option => {
        for (let i = 0 ; i < this.options.length; i++) {
          option.toLowerCase().indexOf(val.toLowerCase()) === 0
        }
      }
      );*/
      return this.options;
    }
  }
}
