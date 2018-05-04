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
import {Unit} from './shared/models/unit.model';
import {RelationUnit} from './shared/models/relation.model';


@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit {

  static URL = 'home';
  nodes: Node[] = [];
  nodesNotRelated: Node[] = [];
  links: Link[] = [];
  units: Unit[];
  relationsUnit: RelationUnit[];

  searchUnit: FormControl;
  filteredUnits: Observable<RelationUnit[]>;

  constructor(private snackBar: MatSnackBar, private unitService: UnitService) {
  }

  ngOnInit(): void {
    this.synchronizedGraph();
    this.synchronizedSearch();
  }

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
    let y = 20;
    for (const unit of this.units) {
      //  console.log(unit.name);
      this.nodes.push(new Node(unit.name, x, 10));
      this.nodesNotRelated.push(new Node(unit.name, 75, y));
      x = x + 200;
      y = y + 60;
    }

    // console.log('Nodos' + this.nodes.length);
    //  console.log('Links' + this.links.length);
  }

  onEnter(code: string) {
// You can specify an exact string or a regex for the token
    const tokenMatchers = [
      'new', '#', '<',
      ['id', /[0-9]+/],
      ['unit', /[a-zA-Z][a-zA-Z0-9]*/]
    ];

    const ignorePattern = '[\n\s \t]+';

    const lex = new Lex(code, tokenMatchers, ignorePattern);
    const unit = lex.nextToken();
    const sharp = lex.nextToken();
    try {
      if (unit['name'] !== 'unit' && sharp['name'] !== '#') {
        throw error();
      } else {
        const news = lex.nextToken();
        const less = lex.nextToken();
        if (news['name'] === 'new' || news['name'] === 'id' && less['name'] === '<') {
          console.log(news);
          /* let unit: Unit;
           unit = {name: unit['lexeme']};
           this.createUnit(unit);/*/
        } else {
          throw error();
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

  createUnit(unit: Unit): void {
    this.unitService.create(unit).subscribe(data => {
      this.snackBar.open('Creado Correctamente !', 'X', {
        duration: 8000
      });
      this.synchronizedGraph();
    });
  }

  synchronizedSearch() {
    this.searchUnit = new FormControl();
    this.filteredUnits = this.searchUnit.valueChanges
      .pipe(
        startWith(''),
        map(unit => this.filters(unit))
      );
  }

  filters(name: string) {
    if (name !== '') {
      this.unitService.filter(name).subscribe(data =>
        this.relationsUnit = data
      );
      return this.relationsUnit;
    }
  }
}
