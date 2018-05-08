///<reference path="shared/entity/lex.entity.ts"/>
import {Component, OnInit} from '@angular/core';
import { UnitService } from './shared/services/unit.service';
import { MatSnackBar } from '@angular/material';
import { Link } from './d3/models/link';
import { Node } from './d3/models/node';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators/map';
import { Observable } from 'rxjs/Observable';
import { UnitModel } from './shared/models/unit.model';
import { RelationModel } from './shared/models/relation.model';
import { UnitEntity } from './shared/entity/unit.entity';
import { RelationEntity } from './shared/entity/relation.entity';
import { UnitViewEntity } from './shared/entity/unit-view.entity';
import {debounceTime} from 'rxjs/operators';
import {LexEntity} from './shared/entity/lex.entity';


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

  addDataGraph() {

    const unit1 = {name: 'Animales'};
    const unit2 = {name: 'Perro'};
    const unit3 = {name: 'Gato'};
    const unit4 = {name: 'Delfín'};
    const unit5 = {name: 'Caballo'};
    const unit6 = {name: 'Aitor'};
    const unit7 = {name: 'Roberth'};
    const unit8 = {name: 'Alberto'};
    const unit9 = {name: 'Jesus'};
    const unit10 = {name: 'Luis'};

    const unitE1 = new UnitEntity(unit1.name);
    const unitE2 = new UnitEntity(unit2.name);
    const unitE3 = new UnitEntity(unit3.name);
    const unitE4 = new UnitEntity(unit4.name);
    const unitE5 = new UnitEntity(unit5.name);
    const unitE6 = new UnitEntity(unit6.name);
    const unitE7 = new UnitEntity(unit7.name);
    const unitE8 = new UnitEntity(unit8.name);
    const unitE9 = new UnitEntity(unit9.name);
    const unitE10 = new UnitEntity(unit10.name);
    const unitR = new UnitEntity('Raquel');

    /* const relation1 = { topUnit: unit1, lowerUnit: unit2, type: 'use' };
     const relation2 = { topUnit: unit1, lowerUnit: unit3, type: 'use' };
     const relation3 = { topUnit: unit1, lowerUnit: unit4, type: 'use' };
     const relation4 = { topUnit: unit1, lowerUnit: unit5, type: 'use' };
     const relation5 = { topUnit: unit3, lowerUnit: unit6, type: 'inherit' };
     const relation6 = { topUnit: unit3, lowerUnit: unit7, type: 'inherit'  };
     const relation7 = { topUnit: unit3, lowerUnit: unit8, type: 'inherit'  };
     const relation8 = { topUnit: unit7, lowerUnit: unit9, type: 'compose'  };
     const relation9 = { topUnit: unit7, lowerUnit: unit10, type: 'compose'  };*/

    const relationE1 = new RelationEntity(unitE1, unitE2, 'compose');
    const relationE2 = new RelationEntity(unitE1, unitE3, 'compose');
    const relationE3 = new RelationEntity(unitE1, unitE4, 'use');
    const relationE4 = new RelationEntity(unitE1, unitE5, 'compose');
    const relationE5 = new RelationEntity(unitE3, unitE6, 'inherit');
    const relationE6 = new RelationEntity(unitE3, unitE7, 'inherit');
    const relationE7 = new RelationEntity(unitE3, unitE8, 'inherit');
    const relationE8 = new RelationEntity(unitE7, unitE9, 'inherit');
    const relationE9 = new RelationEntity(unitE7, unitE10, 'association');
    const relationR = new RelationEntity(unitE4, unitR, 'inherit');

    const root = this.createView(unitE1);
    root.locate();
    this.nodes = root.createNode();
    this.links = root.createLink();

    console.log('Nodos' + this.nodes.length);
    console.log('Links' + this.links.length);
  }

  createView(unit: UnitEntity): UnitViewEntity {
    const root = new UnitViewEntity(unit);
    const childs = unit.getChilds();
    for (const child of childs) {
      root.appendChild(this.createView(child));
    }
    return root;
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
  /*createUnit(unit: UnitEntity) {
    this.unitService.create(unit).subscribe(data => {
      this.snackBar.open('Creado Correctamente !', 'X', {
        duration: 8000
      });
      this.synchronizedGraph();
    });
  }*/

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
