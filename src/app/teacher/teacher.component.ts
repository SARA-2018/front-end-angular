import { Component, OnInit } from '@angular/core';
import { UnitService } from './shared/services/unit.service';
import { MatOptionSelectionChange, MatSnackBar } from '@angular/material';
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
import { Lexical } from './shared/models/lexical.model';
import { RelationService } from './shared/services/relation.service';
import { TypeRelation } from './shared/models/type-relation.enum';
import { Command } from './shared/models/commands/command.model';
import { FilterDto } from './shared/dtos/filter.dto';
import { Router } from '@angular/router';
import { Logger } from './shared/models/logger.model';
import { LoggerView } from './shared/views/logger.view';

@Component({
  templateUrl: 'teacher.component.html',
  styleUrls: ['teacher.component.css']
})

export class TeacherComponent implements OnInit {

  static URL = 'teacher';
  unitsDto: UnitDto[];
  units: Unit[] = [];
  relations: Relation[] = [];
  relationsDto: RelationDto[];
  filterRelation: FilterDto[] = [];
  nodes: Node[] = [];
  nodesNotRelated: Node[] = [];
  links: Link[] = [];
  searchUnit: FormControl;
  filteredUnits: Observable<FilterDto[]>;
  text = '';

  readonly db = true;

  constructor(private snackBar: MatSnackBar, private unitService: UnitService, private relationService: RelationService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.synchronizedGraph();
    this.synchronizedSearch();
  }

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
    const relat1 = new Relation(unitE10, unitR2, TypeRelation.INHERIT, undefined, '8', '0');
    const relat2 = new Relation(unitE10, unitR3, TypeRelation.INHERIT, 'semantica2', 'N', '1');
    const relat3 = new Relation(unitE10, unitR3, TypeRelation.INHERIT, 'semantica2', '1', '2');
    const relat4 = new Relation(unitE10, unitR3, TypeRelation.INHERIT, 'semantica2', '3', '4');

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
        this.relations.push(new Relation(topUnit, lowerUnit, relationDto.type, relationDto.semantics,
          relationDto.cardinalTopUnit, relationDto.cardinalLowerUnit));
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
    console.log('Modelos');
    const logger = new Logger(root);
    logger.log();
    const rootView = new UnitViewImp(root);
    console.log('Vistas');
    const loggerView = new LoggerView(rootView);
    loggerView.log();
    // rootView.locate();
    // this.nodes = rootView.createNode();
   // this.links = rootView.createLink();
    console.log('Nodos: ' + this.nodes.length);
    console.log('Links: ' + this.links.length);
  }

  onEnter(text: string) {
    try {
      const lexical = new Lexical();
      const command: Command = lexical.analyzeCommand(text);
      command.execute(this.unitService, this.relationService).subscribe(
        () => this.synchronizedGraph()
      );
    } catch (err) {
      if (err.code === 'LEXICAL_ERROR') {
        this.snackBar.open(err.message, '', {
          duration: 2000
        });
      } else {
        console.log(err);
        this.snackBar.open('Comando erróneo', '', {
          duration: 2000
        });
      }
    }
  }

  synchronizedSearch() {
    this.searchUnit = new FormControl();
    this.filteredUnits = this.searchUnit.valueChanges
      .pipe(
        map(val => this.filter(val))
      );
  }

  filter(unitName: string): FilterDto[] {
    const regExp = new RegExp('[\ns \t:~#<>]+');
    const parse = unitName.split(regExp);
    const unit = parse.pop();
    if (unit !== '') {
      this.unitService.filter(unit).subscribe(data => {
        this.filterRelation = data;
      });
      return this.filterRelation.filter(value => value.unit.name.indexOf(unit.toString()) === 0);
    }
  }

  onAddHelp(event: MatOptionSelectionChange, relationUnit, value: string): void {
    const help = [];
    help.push(relationUnit);
    const val = help.pop();
    this.text = value.concat(val);
  }

  valueText() {
    return this.text;
  }
}
