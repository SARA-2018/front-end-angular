import { Component } from '@angular/core';
import { Unit } from '../shared/models/unit.model';
import { Exercise } from '../shared/models/exercise.model';
import { Video } from '../shared/models/video.model';

@Component({
  templateUrl: 'teacher.component.html',
  styleUrls: ['teacher.component.css']
})

export class TeacherComponent {

  static URL = 'teacher';
  unit: Unit;
  exercise: Exercise;
  video: Video;

  constructor() {
  }

  openUnit(unit: Unit) {
    this.unit = unit;
  }

  openExercise(exercise: Exercise) {
    this.exercise = exercise;
  }

  openVideo(video: Video) {
    this.video = video;
  }
}
