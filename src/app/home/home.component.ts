import { Component, OnInit } from '@angular/core';
import { UnitService } from './shared/services/unit.service';
import { MatSnackBar } from '@angular/material';
import { Link } from './d3/models/link';
import { Node } from './d3/models/node';
import { FormControl } from '@angular/forms';
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
import { debounceTime } from 'rxjs/operators';
import { LexEntity } from './shared/entity/lex.entity';


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
  relationsUnit: RelationModel[] = [];
  searchUnit: FormControl;
  filteredUnits: Observable<RelationModel[]>;

  constructor(private snackBar: MatSnackBar, public unitService: UnitService) {
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

  generateData(): Unit {
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
    const unitA = new Unit('Alvaro');

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
    const relationA = new Relation(unitE4, unitA, 'compose');


    const unitPadre = new Unit('Padre');
    const unitHijo = new Unit('Hijo');
    const RelationPH = new Relation(unitPadre, unitHijo, 'inherit');

    // root
    // UnitE4 1 - 1
    // UnitE7 1 - 2
    // UnitE3 1 - 3 - 2
    return root;
  }

  addDataGraph() {

    const root = this.generateData();
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



  onEnter(command: string) {
    try {
      return new LexEntity(command, this.unitService, this.snackBar);
    } catch (err) {
      if (err.code === 'LEXICAL_ERROR') {
        this.snackBar.open(err.message, 'X');
      }
    }
  }

  synchronizedSearch() {
    this.searchUnit = new FormControl();
    this.filteredUnits = this.searchUnit.valueChanges
      .pipe(
        debounceTime(200),
        map(val => this.filter(val))
      );
  }

  filter(unitName: string) {
    const regExp = new RegExp('[\ns \t:~#<>]+');
    const parse = unitName.split(regExp);
    const unit = parse.pop();
    if (unit !== '') {
      this.unitService.filter(unit).subscribe(data => {
        this.relationsUnit = data;
        if (data.length === 0) {
          this.snackBar.open('No existe ' + unitName, '', {
            duration: 2000
          });
        }
      }
      );
      return this.relationsUnit.filter(value =>
        value.name.toLowerCase().indexOf(unit.toString().toLowerCase()) === 0
      );
    }
  }
}
