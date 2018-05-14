import { Component, OnInit } from '@angular/core';
import { UnitService } from './shared/services/unit.service';
import { MatSnackBar } from '@angular/material';
import { Link } from './d3/models/link';
import { Node } from './d3/models/node';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators/map';
import { Observable } from 'rxjs/Observable';
import { UnitDto } from './shared/dtos/unit.dto';
import { RelationDto } from './shared/dtos/relation.dto';
import { Unit } from './shared/models/unit.model';
import { RelationView } from './shared/views/relation.view';
import { createViewState } from '@angular/core/src/render3/instructions';
import { UnitView } from './shared/views/unit.view';
import { BlockView } from './shared/views/block.view';
import { Block } from './shared/models/block.model';
import { debounceTime } from 'rxjs/operators';
import { Lexical } from './shared/models/lex.model';
import { RelationService } from './shared/services/relation.service';


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
  relationsUnit: RelationDto[] = [];
  searchUnit: FormControl;
  filteredUnits: Observable<RelationDto[]>;

  constructor(private snackBar: MatSnackBar, public unitService: UnitService, public relationService: RelationService) {
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
    const unitR2 = new Unit('Raquel2');
    const unitR3 = new Unit('Raquel3');
    const unitA = new Unit('Alvaro');

    const relationE1 = new RelationView(root, unitE2, 'compose');
    const relationE2 = new RelationView(root, unitE3, 'compose');
    const relationE3 = new RelationView(root, unitE4, 'compose');
    const relationE4 = new RelationView(root, unitE5, 'compose');
    const relationE5 = new RelationView(unitE3, unitE6, 'inherit');
    const relationE6 = new RelationView(unitE3, unitE7, 'inherit');
    const relationE7 = new RelationView(unitE3, unitE8, 'inherit');
    const relationE8 = new RelationView(unitE7, unitE9, 'inherit');
    const relationE9 = new RelationView(unitE7, unitE10, 'use');
    const relationR = new RelationView(unitE4, unitR, 'inherit', 'sem1');
    const relationA = new RelationView(unitE4, unitA, 'use');
    const relat = new RelationView(unitE4, unitE9, 'inherit', 'sem2');
    const relat1 = new RelationView(unitE10, unitR2, 'inherit', 'semantica1');
    const relat2 = new RelationView(unitE10, unitR3, 'inherit', 'semantica2');
    const relat3 = new RelationView(unitE10, unitA, 'use');
    const relat4 = new RelationView(unitE4, unitA, 'compose');

    // root
    // UnitE4 1 - 1
    // UnitE7 1 - 2
    // UnitE3 1 - 3 - 2
    return root;
  }

  addDataGraph() {
    const root = this.generateData();
    const rootView = new UnitView(root);
    rootView.locate();
    this.nodes = rootView.createNode();
    this.links = rootView.createLink();
  }

  onEnter(command: string) {
    try {
      const lex = new Lexical(this.unitService, this.relationService, this.snackBar);
      lex.analyzeCommand(command);
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
