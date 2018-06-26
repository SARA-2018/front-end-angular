import { Component, Input, OnInit } from '@angular/core';
import { Exercise } from '../../../teacher/shared/exercise.model';

@Component({
    selector: 'app-exercise',
    templateUrl: 'exercise.component.html',
    styleUrls: ['exercise.component.css']
})

export class ExerciseStudentComponent implements OnInit {


  @Input() exercise: Exercise;
  constructor() {
  }

  ngOnInit(): void {
    console.log('---------------Soy exercise-----------------');
    console.log(this.exercise);
  }

}

