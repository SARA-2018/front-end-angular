import {Component, HostBinding} from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';

@Component({
  selector: 'app-exercise-unit',
  templateUrl: 'exercise-unit.component.html',
  styleUrls: ['exercise-unit.component.css']
})

export class ExerciseUnitComponent {

  constructor() {
  }

  @HostBinding('class.is-open')
  isOpen: Boolean = false;

  toggle() {
    this.isOpen = !this.isOpen;
  }
}

