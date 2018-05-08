import {MatSnackBar} from '@angular/material';
import {UnitService} from '../services/unit.service';

export class UnitEntity {

    id: number;
    name: string;
    childs: UnitEntity[] = [];
    relation: string;

    constructor(name) {
      this.name = name;
      console.log(name);
    }

    appendChild(child: UnitEntity) {
      this.childs.push(child);
    }

    getChilds(): UnitEntity[] {
      return this.childs;
    }

    setRelation(type: string) {
      this.relation = type;
    }

  /*createUnit(unit: UnitEntity, unitService: UnitService, snackBar: MatSnackBar) {
    unitService.create(name).subscribe(data => {
      snackBar.open('Creado Correctamente !', 'X', {
        duration: 8000
      });
      //  this.synchronizedGraph();
    });
  }*/
}
