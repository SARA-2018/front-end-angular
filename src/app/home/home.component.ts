import { Component, OnInit } from '@angular/core';
import * as Lex from 'lexical-parser';
import { error } from 'util';
import { UnitService } from './shared/services/unit.service';
import { MatSnackBar } from '@angular/material';
import { Link } from './d3/models/link';
import { Node } from './d3/models/node';
import { FormControl } from '@angular/forms';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { Observable } from 'rxjs/Observable';
import { UnitModel } from './shared/models/unit.model';
import { RelationModel } from './shared/models/relation.model';
import { Unit } from './shared/entity/unit.entity';
import { Relation } from './shared/entity/relation.entity';
import { createViewState } from '@angular/core/src/render3/instructions';
import { UnitView } from './shared/entity/unit-view.entity';
import { BlockView } from './shared/entity/block-view.entity';
import { Block } from './shared/entity/block.entity';


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
  units: UnitModel[];
  relationsUnit: RelationModel[] = [];
  searchUnit: FormControl;
  filteredUnits: Observable<RelationModel[]>;

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
    /* this.unitService.getAll().subscribe(data => {
       this.units = data;
       this.addDataGraph();
     });*/
    this.addDataGraph();
  }

  addDataGraph() {

    const unit1 = { name: 'Animales' };
    const unit2 = { name: 'Perro' };
    const unit3 = { name: 'Gato' };
    const unit4 = { name: 'Delfín' };
    const unit5 = { name: 'Caballo' };
    const unit6 = { name: 'Aitor' };
    const unit7 = { name: 'Roberth' };
    const unit8 = { name: 'Alberto' };
    const unit9 = { name: 'Jesus' };
    const unit10 = { name: 'Luis' };

    const root = new Unit(unit1.name);
    const unitE2 = new Unit(unit2.name);
    const unitE3 = new Unit(unit3.name);
    const unitE4 = new Unit(unit4.name);
    const unitE5 = new Unit(unit5.name);
    const unitE6 = new Unit(unit6.name);
    const unitE7 = new Unit(unit7.name);
    const unitE8 = new Unit(unit8.name);
    const unitE9 = new Unit(unit9.name);
    const unitE10 = new Unit(unit10.name);
    const unitR = new Unit('Raquel');

    const relationE1 = new Relation(root, unitE2, 'compose');
    const relationE2 = new Relation(root, unitE3, 'compose');
    const relationE3 = new Relation(root, unitE4, 'compose');
    const relationE4 = new Relation(root, unitE5, 'compose');
    const relationE5 = new Relation(unitE3, unitE6, 'inherit');
    const relationE6 = new Relation(unitE3, unitE7, 'inherit');
    const relationE7 = new Relation(unitE3, unitE8, 'inherit');
    const relationE8 = new Relation(unitE7, unitE9, 'inherit');
    const relationE9 = new Relation(unitE7, unitE10, 'use');
    const relationR = new Relation(unitE4, unitR, 'inherit');

    console.log('MODELOS: ');
    root.log('');
    const rootView = new UnitView(root);
    console.log('VISTAS: ');
    rootView.log('');
    rootView.locate();
    this.nodes = rootView.createNode();
    this.links = rootView.createLink();

    console.log('Nodos' + this.nodes.length);
    console.log('Links' + this.links.length);
  }



  onEnter(code: string) {
    // You can specify an exact string or a regex for the token
    const tokenMatchers = [
      'new', '#', '~', '<', 'inherit', ':',
      ['id', /[0-9]+/],
      ['units', /[a-zA-Z][a-zA-Z0-9]*/],
    ];

    const ignorePattern = '[\n\s \t]+';

    const lex = new Lex(code, tokenMatchers, ignorePattern);
    const units = lex.nextToken();
    try {
      const sharp = lex.nextToken();
      if (units['name'] !== 'units' && units['name'] !== '~' || sharp['name'] !== 'units' && sharp['name'] !== '#') {
      } else {
        const news = lex.nextToken();
        if (news['name'] === 'new') {
          console.log('**********Creo**********');
          /*let unit: Unit;
          unit = new Unit(units['lexeme']); // {name: units['lexeme']};
          this.createUnit(unit);*/
        } else if (news['name'] === '#') {
          const id = lex.nextToken();
          if (id['name'] === 'id') {
            // this.delete(id['lexeme']);
            console.log('-----------Borro--------------' + id['lexeme']);
          } else {
            //  throw error();
          }
        } else {
          if (news['name'] === 'id') {
            const less = lex.nextToken();
            if (less['name'] === '<') {
              const inherit = lex.nextToken();
              const ponits = lex.nextToken();
              const relation = lex.nextToken();
              const name = lex.nextToken();
              const sharp2 = lex.nextToken();
              const id = lex.nextToken();
              if (inherit['name'] !== 'inherit' || ponits['name'] !== ':' || relation['name'] !== 'units' || name['name'] !== 'units') {
                //      throw error();
              } else if (sharp2['name'] === '#' || id['name'] === 'id') {
                console.log(news['lexeme'] + '-----------creo Herencia--------------' + id['lexeme']);
              }
            } else {
              //    throw error();
            }
          }
        }
      }
    } catch (err) {
      // Error handling
      if (err.code === 'LEXICAL_ERROR') {
        this.snackBar.open(err.message, 'X');
      } else {
        this.snackBar.open('Syntax error', 'X', {
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
        map(unit => this.filter(unit))
      );
  }

  filter(name: string) {
    const regExp = new RegExp('[\ns \t:~#<>]+');
    const parse = name.split(regExp);
    const val = parse.pop();
    if (val !== '') {
      this.unitService.filter(val).subscribe(data =>
        this.relationsUnit = data
      );
      return this.relationsUnit.filter(value => value.name.indexOf(val) === 0);
    }
  }

  delete(unit: Unit) {
    this.unitService.delete(unit).subscribe(() => this.synchronizedGraph());
    this.snackBar.open('Eliminado Correctamente !', 'X', {
      duration: 8000
    });
  }
}
