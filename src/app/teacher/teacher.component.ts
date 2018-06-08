import { Component } from '@angular/core';
import { Unit } from './graph-unit/models/unit.model';

@Component({
  templateUrl: 'teacher.component.html',
  styleUrls: ['teacher.component.css']
})

export class TeacherComponent {

  static URL = 'teacher';
  private unit: Unit;

  constructor() {
  }

  openUnit(unit: Unit) {
    console.log(unit.getName());
    this.unit = unit;
  }
}
