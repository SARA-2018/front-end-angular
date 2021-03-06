import { Component, EventEmitter, HostBinding, OnInit, Output } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators/map';
import { Observable } from 'rxjs/Observable';
import { UnitInputDto } from '../../shared/dtos/unit-input.dto';
import { RelationDto } from './dtos/relation.dto';
import { Relation } from './models/relation.model';
import { Unit } from '../../shared/models/unit.model';
import { UnitView } from './views/unit.view';
import { Lexical } from './models/lexical.model';
import { RelationService } from './services/relation.service';
import { FilterDto } from './dtos/filter.dto';
import { Command } from './models/commands/command.model';
import { Link } from './models/link.model';
import { Node } from './models/node.model';
import { FriendsDto } from './dtos/friends.dto';
import { OpenUnitCommand } from './models/commands/open-unit-command.model';
import { DtoConverter } from '../../shared/dto-converter';
import { UnitService } from '../../shared/services/unit.service';

@Component({
  selector: 'app-graph-unit',
  templateUrl: 'graph-unit.component.html',
  styleUrls: ['graph-unit.component.css']
})

export class GraphUnitComponent implements OnInit {

  nodes: Node[] = [];
  links: Link[] = [];
  nodesNotRelated: Node[] = [];
  filterRelation: FilterDto[] = [];
  searchUnit: FormControl;
  filteredUnits: Observable<FilterDto[]>;
  unitName = '';

  @Output() openUnit = new EventEmitter<Unit>();
  @HostBinding('class.is-open')
  isOpen = true;

  constructor(private snackBar: MatSnackBar, private unitService: UnitService,
    private relationService: RelationService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.unitService.getAll().subscribe(units => {
      if (units.length > 0) {
        const openUnit = new OpenUnitCommand(units[0].code);
        openUnit.execute(this.unitService).subscribe(
          (friends) => {
            this.finishExecutionOpenCommand(friends);
          }
        );
      }
    });
    this.synchronizedUnitsNotRelated();
    this.synchronizedSearch();
  }

  synchronizedUnitsNotRelated() {
    this.nodesNotRelated = [];
    this.unitService.getUnitsNotRelated().subscribe(unitsNotRelated => {
      let x = 0;
      const spaceBetweenUnits = 10;
      for (const unitNotRelated of unitsNotRelated) {
        const view = new UnitView(new Unit(unitNotRelated.name, unitNotRelated.code));
        view.shift(x, 15);
        this.nodesNotRelated.push(view.createNode()[0]);
        x += view.getXSize() + spaceBetweenUnits;
      }
    });
  }

  synchronizedGraph(friends: FriendsDto) {
    const unitsDto: UnitInputDto[] = [];
    const relationsDto: RelationDto[] = [];
    for (const topUnit of friends.topUnits) {
      unitsDto.push(topUnit);
    }
    unitsDto.push(friends.unit);
    for (const lowerUnit of friends.lowerUnits) {
      unitsDto.push(lowerUnit);
    }
    for (const relation of friends.relations) {
      relationsDto.push(relation);
    }
    this.addDataGraph(unitsDto, relationsDto);
  }

  addDataGraph(unitsDto: UnitInputDto[], relationsDto: RelationDto[]) {
    const units: Unit[] = [];
    const relations: Relation[] = [];
    for (const unitDto of unitsDto) {
      units.push(new Unit(unitDto.name, unitDto.code));
    }
    for (const relationDto of relationsDto) {
      const topUnit = units.find(unit => unit.getCode() === relationDto.topUnit.code);
      const lowerUnit = units.find(unit => unit.getCode() === relationDto.lowerUnit.code);
      relations.push(new Relation(topUnit, lowerUnit, relationDto.type, relationDto.semantics,
        relationDto.cardinalTopUnit, relationDto.cardinalLowerUnit));
    }
    const root = units[0];
    const rootView = new UnitView(root);
    rootView.locate();
    this.nodes = rootView.createNode();
    this.links = rootView.createLink();
  }

  finishExecutionOpenCommand(friends) {
    this.openUnit.emit(new DtoConverter().convertUnit(friends.unit));
    this.synchronizedGraph(friends);
    this.synchronizedUnitsNotRelated();
  }

  onEnter(text: string) {
    try {
      const lexical = new Lexical();
      const command: Command = lexical.analyzeCommand(text);
      command.execute(this.unitService, this.relationService, this.dialog).subscribe(
        (friends) => {
          if (command.isOpenUnit()) {
            this.finishExecutionOpenCommand(friends);
          } else {
            this.synchronizedUnitsNotRelated();
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

  onSelection(relationUnit, text: string): void {
    const helpText = [];
    helpText.push(relationUnit);
    const help = helpText.pop();
    this.unitName = text.concat(help);
  }

  onChange(): string {
    return this.unitName;
  }

  close() {
    this.isOpen = false;
  }

  open() {
    this.isOpen = true;
  }

}
