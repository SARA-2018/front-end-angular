import { Component} from '@angular/core';

@Component({
  selector: 'app-info-unit',
  templateUrl: 'info-unit.component.html',
  styleUrls: ['info-unit.component.css']
})

export class InfoUnitComponent {

  public sessions: number[] = [1];
  public lessons: number[] = [0];

  constructor() {
  }
  toArray(n: number): number[] {
    return Array(n);
  }

  visibilityLesson() {
    this.sessions.push(1);
    /*
    const lesson = document.getElementById('card_lesson');
    const validate = lesson.style.display;
    if (validate === 'none' || validate === '') {
      lesson.style.display = 'block';
    } else {
      lesson.style.display = 'none';
    }*/
  }

  visibility(sessionId: number) {
    this.sessions[sessionId] = this.sessions[sessionId] + 1;
    console.log(this.sessions);
    // this.lessons.push(this.lessons.length + 1);
    /*const content = document.getElementById('card_cont_lesson');
    const validate = content.style.display;
    if (validate === 'none' || validate === '') {
      content.style.display = 'block';
    } else {
      content.style.display = 'none';
    }*/
  }
}
