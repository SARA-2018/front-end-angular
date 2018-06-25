import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExerciseService } from '../../../shared/exercise.service';

@Component({
    templateUrl: 'exercise.component.html',
    styleUrls: ['exercise.component.css']
})

export class ExerciseComponent implements OnInit {

  static URL = 'exercise/:id';
  exerciseId: string;


  constructor(private route: ActivatedRoute, private exerciseService: ExerciseService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.exerciseId = params['id']);
    this.exercise();
  }

  exercise(): void {
    this.exerciseService.getById(this.exerciseId).subscribe(exerciseDto => {
      console.log(exerciseDto);
    });
  }
}

