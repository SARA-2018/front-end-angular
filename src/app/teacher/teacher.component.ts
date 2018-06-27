import { Component } from '@angular/core';
import { Unit } from './graph-unit/models/unit.model';
import { Exercise } from '../shared/models/exercise.model';
import { Video } from '../shared/models/video.model';

@Component({
  templateUrl: 'teacher.component.html',
  styleUrls: ['teacher.component.css']
})

export class TeacherComponent {

  static URL = 'teacher';
  private unit: Unit;
  private exercise: Exercise;
  private video: Video;

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
