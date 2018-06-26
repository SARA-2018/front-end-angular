import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ExerciseService } from '../../../shared/exercise.service';
import {Exercise} from '../../../teacher/shared/exercise.model';

@Component({
    selector: 'app-exercise',
    templateUrl: 'exercise.component.html',
    styleUrls: ['exercise.component.css']
})

export class ExerciseComponent implements OnInit{


  @Input() exercise: Exercise;

  constructor() {
  }

  ngOnInit(): void {
    console.log('---------------Soy exercise-----------------')
    console.log(this.exercise);
  }

}

