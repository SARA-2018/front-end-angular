import {Component, HostBinding} from '@angular/core';

@Component({
  selector: 'app-exercise-unit',
  templateUrl: 'exercise-unit.component.html',
  styleUrls: ['exercise-unit.component.css']
})

export class ExerciseUnitComponent {

  constructor() {
  }

  @HostBinding('class.is-open')
  isOpen = false;

  toggle() {
    this.isOpen = !this.isOpen;
  }
}

