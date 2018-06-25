import { Component } from '@angular/core';
import { Unit } from './graph-unit/models/unit.model';
import { Exercise } from './shared/exercise.model';
import { Video } from './info-unit/models/video.model';

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
    console.log('teacher tiene:');
    console.log(exercise);
    this.exercise = exercise;
  }

  openVideo(video: Video) {
    console.log('teacher tiene:');
    console.log(video);
    this.video = video;
  }
}
