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
import { Relation } from './shared/models/relation.model';
import { Unit } from './shared/models/unit.model';
import { UnitViewImp } from './shared/views/unit.view';
import { debounceTime } from 'rxjs/operators';
import { Lexical } from './shared/models/lexical.model';
import { RelationService } from './shared/services/relation.service';
import { TypeRelation } from './shared/models/type-relation.enum';
import { Command } from './shared/models/command.model';



@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit {

  static URL = 'home';
  unitsDto: UnitDto[];
  units: Unit[] = [];
  relations: Relation[] = [];
  relationsDto: RelationDto[];
  filterRelation: RelationDto[] = [];
  nodes: Node[] = [];
  nodesNotRelated: Node[] = [];
  links: Link[] = [];
  searchUnit: FormControl;
  filteredUnits: Observable<RelationDto[]>;

  readonly db = true;

  constructor(private snackBar: MatSnackBar, private unitService: UnitService, private relationService: RelationService) {
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
    this.unitsDto = [];
    this.relationsDto = [];
    this.units = [];
    this.relations = [];
    if (this.db) {
       this.unitService.getAll().subscribe(units => {
         this.unitsDto = units;
         this.relationService.getAll().subscribe(relations => {
          this.relationsDto = relations;
          this.addDataGraph();
       });
      });
    } else {
      this.addDataGraph();
    }
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

    const relationE1 = new Relation(root, unitE2, TypeRelation.COMPOSE);
    const relationE2 = new Relation(root, unitE3, TypeRelation.COMPOSE);
    const relationE3 = new Relation(root, unitE4, TypeRelation.COMPOSE);
    const relationE4 = new Relation(root, unitE5, TypeRelation.COMPOSE);
    const relationE5 = new Relation(unitE3, unitE6, TypeRelation.INHERIT);
    const relationE6 = new Relation(unitE3, unitE7, TypeRelation.INHERIT);
    const relationE7 = new Relation(unitE3, unitE8, TypeRelation.INHERIT);
    const relationE8 = new Relation(unitE7, unitE9, TypeRelation.INHERIT);
    const relationE9 = new Relation(unitE7, unitE10, TypeRelation.USE);
    const relationR = new Relation(unitE4, unitR, TypeRelation.INHERIT, 'sem1');
    const relationA = new Relation(unitE4, unitA, TypeRelation.USE);
    const relat = new Relation(unitE4, unitE9, TypeRelation.INHERIT, 'sem2');
    const relat1 = new Relation(unitE10, unitR2, TypeRelation.INHERIT, 'semantica1');
    const relat2 = new Relation(unitE10, unitR3, TypeRelation.INHERIT, 'semantica2');
    const relat3 = new Relation(unitE10, unitA, TypeRelation.USE);
    const relat4 = new Relation(unitE4, unitA, TypeRelation.COMPOSE);

    // root
    // UnitE4 1 - 1
    // UnitE7 1 - 2
    // UnitE3 1 - 3 - 2
    return root;
  }

  isRelated(unit: Unit): boolean {
    for (let i = 0; i < this.relations.length; i++) {
      if ((this.relations[i].getTopUnit().getCode() === unit.getCode()) ||
        (this.relations[i].getLowerUnit().getCode() === unit.getCode())) {
        return true;
      }
    }
    return false;
  }

  addDataGraph() {
    this.nodes = [];
    this.links = [];
    this.nodesNotRelated = [];
    this.units = [];
    this.relations = [];
    let root;
    if (this.db) {
      for (const unitDto of this.unitsDto) {
        this.units.push(new Unit(unitDto.name, unitDto.code));
      }
      for (const relationDto of this.relationsDto) {
        const topUnit = this.units.find(unit => unit.getCode() === relationDto.topUnit.code);
        const lowerUnit = this.units.find(unit => unit.getCode() === relationDto.lowerUnit.code);
        this.relations.push(new Relation(topUnit, lowerUnit, relationDto.type, relationDto.semantics));
      }
      let y = 20;
      for (let i = 0; i < this.units.length; i++) {
        if (!this.isRelated(this.units[i])) {
          const view = new UnitViewImp(this.units[i]);
          view.shift(75, y);
          this.nodesNotRelated.push(view.createNode()[0]);
          y += 60;
        }
      }
      root = this.units[0];
    } else {
      const unitsNotRelated: Unit[] = [];
      root = this.generateData();
      unitsNotRelated.push(new Unit('UnitNR1'));
      unitsNotRelated.push(new Unit('UnitNR2'));
      const nodesNo: Node[] = [];
      let y = 10;
      for (const unitView of unitsNotRelated) {
        const view = new UnitViewImp(unitView);
        view.shift(75, y);
        nodesNo.push(view.createNode()[0]);
        y += 50;
      }
      this.nodesNotRelated = nodesNo;
    }
    root.log(' ');
    const rootView = new UnitViewImp(root);
    rootView.locate();
    this.nodes = rootView.createNode();
    this.links = rootView.createLink();
  }

  onEnter(text: string) {
    try {
      const lexical = new Lexical();
      const command: Command = lexical.analyzeCommand(text);
      command.execute(this.unitService, this.relationService);
    } catch (err) {
      if (err.code === 'LEXICAL_ERROR') {
        this.snackBar.open(err.message, '', {
          duration: 2000
        });
      } else {
        console.log(err);
        this.snackBar.open('Commando Erroneo', '', {
          duration: 2000
        });
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

  filter(unitName: string): RelationDto[] {
    const regExp = new RegExp('[\ns \t:~#<>]+');
    const parse = unitName.split(regExp);
    const unit = parse.pop();
    if (unit !== '') {
      this.unitService.filter(unit).subscribe(data => {
        this.filterRelation = data;
      });
      return this.filterRelation.filter(value => value.name.indexOf(unit.toString()) === 0);
    }
  }
}
