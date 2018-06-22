import { Component } from '@angular/core';

@Component({
    templateUrl: 'lesson.component.html',
    styleUrls: ['lesson.component.css']
})

export class LessonComponent {

  static URL = 'lesson/:id';

  constructor() {
  }

}

