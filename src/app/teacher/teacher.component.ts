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

export class TeacherComponent {

  static URL = 'teacher';

  constructor() {
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
    for (let i = 0; i < 10; i++) {
      this.units.push(new Unit('Unit ' + i));
    }

    this.relations.push(new Relation(this.units[0], this.units[1], TypeRelation.COMPOSE));
    this.relations.push(new Relation(this.units[0], this.units[2], TypeRelation.COMPOSE));
    this.relations.push(new Relation(this.units[0], this.units[3], TypeRelation.COMPOSE));
    this.relations.push(new Relation(this.units[0], this.units[4], TypeRelation.COMPOSE));
    this.relations.push(new Relation(this.units[3], this.units[6], TypeRelation.INHERIT));
    this.relations.push(new Relation(this.units[3], this.units[7], TypeRelation.INHERIT));
    this.relations.push(new Relation(this.units[3], this.units[8], TypeRelation.INHERIT));
    this.relations.push(new Relation(this.units[7], this.units[9], TypeRelation.INHERIT));
    this.relations.push(new Relation(this.units[7], this.units[10], TypeRelation.USE));

    return this.units[0];
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
    let root;
    if (this.db) {
      this.units = [];
      this.relations = [];
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
      console.log('Relaciones ' + this.relations.length + 'Unidades' + this.units.length);
      unitsNotRelated.push(new Unit('NotRelated1'));
      unitsNotRelated.push(new Unit('NotRelated2'));
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
    rootView.locate();
    this.nodes = rootView.createNode();
    this.links = rootView.createLink();
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
