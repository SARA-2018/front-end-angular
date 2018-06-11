import { Component, EventEmitter, HostBinding, OnInit, Output } from '@angular/core';
import { UnitService } from './services/unit.service';
import { MatOptionSelectionChange, MatSnackBar, MatDialog } from '@angular/material';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators/map';
import { Observable } from 'rxjs/Observable';
import { UnitDto } from './dtos/unit.dto';
import { RelationDto } from './dtos/relation.dto';
import { Relation } from './models/relation.model';
import { Unit } from './models/unit.model';
import { UnitViewImp } from './views/unit.view';
import { Lexical } from './models/lexical.model';
import { RelationService } from './services/relation.service';
import { FilterDto } from './dtos/filter.dto';
import { Command } from './models/commands/command.model';
import { LoggerView } from './views/logger.view';
import { LoggerModel } from './models/logger.model';
import { Link } from './models/link.model';
import { Node } from './models/node.model';
import { FriendsDto } from './dtos/friends.dto';
import { OpenUnit } from './models/commands/open-unit.model';

@Component({
  selector: 'app-graph-unit',
  templateUrl: 'graph-unit.component.html',
  styleUrls: ['graph-unit.component.css']
})

export class GraphUnitComponent implements OnInit {

  unitsDto: UnitDto[];
  unitsNotRelatedDto: UnitDto[];
  units: Unit[] = [];
  relations: Relation[] = [];
  relationsDto: RelationDto[];
  filterRelation: FilterDto[] = [];
  nodes: Node[] = [];
  nodesNotRelated: Node[] = [];
  links: Link[] = [];
  searchUnit: FormControl;
  filteredUnits: Observable<FilterDto[]>;
  text: String = '';

  @Output() openUnit = new EventEmitter<Unit>();
  @HostBinding('class.is-open')
  isOpen: Boolean = true;

  constructor(private snackBar: MatSnackBar, private unitService: UnitService,
    private relationService: RelationService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.unitService.getAll().subscribe(units => {
      this.unitsDto = units;
      const openUnit = new OpenUnit(this.unitsDto[0].code);
      openUnit.execute(this.unitService).subscribe(
        (result) => {
          this.finishExecutionOpenCommand(result);
        }
      );
    });
    this.unitService.getUnitsNotRelated().subscribe(unitsNotRelated => {
      this.unitsNotRelatedDto = unitsNotRelated;
    });
    this.synchronizedSearch();
  }

  synchronizedGraph(result: FriendsDto) {
    this.unitsDto = [];
    this.relationsDto = [];
    this.units = [];
    this.relations = [];
    for (const topUnit of result.topUnits) {
      this.unitsDto.push(topUnit);
    }
    this.unitsDto.push(result.unit);
    for (const lowerUnit of result.lowerUnits) {
      this.unitsDto.push(lowerUnit);
    }
    for (const relation of result.relations) {
      this.relationsDto.push(relation);
    }
    this.addDataGraph();
  }

  addDataGraph() {
    this.nodes = [];
    this.links = [];
    this.nodesNotRelated = [];
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
    let x = 0;
    for (const unitNotRelated of this.unitsNotRelatedDto) {
        const view = new UnitViewImp(new Unit(unitNotRelated.name, unitNotRelated.code));
        view.shift(x, 15);
        this.nodesNotRelated.push(view.createNode()[0]);
        x += 180;
    }
    const root = this.units[0];
    console.log('Modelos');
    const logger = new LoggerModel(root);
    logger.log();
    const rootView = new UnitViewImp(root);
    console.log('Vistas');
    const loggerView = new LoggerView(rootView);
    loggerView.log();
    rootView.locate();
    this.nodes = rootView.createNode();
    this.links = rootView.createLink();
    // console.log('Nodos: ' + this.nodes.length);
    // console.log('Links: ' + this.links.length);
  }

  finishExecutionOpenCommand(result) {
    const unit = new Unit(result.unit.name, result.unit.code);
    this.openUnit.emit(unit);
    this.synchronizedGraph(result);
  }

  onEnter(text: string) {
    try {
      const lexical = new Lexical();
      const command: Command = lexical.analyzeCommand(text);
      command.execute(this.unitService, this.relationService, this.dialog).subscribe(
        (result) => {
          if (result) {
            if (result.lowerUnits !== undefined) {
              this.finishExecutionOpenCommand(result);
            }
          }
        }
      );
    } catch (err) {
      if (err.code === 'LEXICAL_ERROR') {
        this.snackBar.open(err.message, '', {
          duration: 2000
        });
      }
      if (err.constructor.name === 'ErrorCommand') {
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

  onSelection(event: MatOptionSelectionChange, relationUnit, text: string): void {
    const helpText = [];
    helpText.push(relationUnit);
    const help = helpText.pop();
    this.text = text.concat(help);
  }

  onChange(): String {
    return this.text;
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

}
