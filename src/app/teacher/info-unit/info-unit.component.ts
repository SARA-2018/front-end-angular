import { Component} from '@angular/core';

@Component({
  selector: 'app-info-unit',
  templateUrl: 'info-unit.component.html',
  styleUrls: ['info-unit.component.css']
})

export class InfoUnitComponent {

  constructor() {
  }

  visibilityLesson() {
    const lesson = document.getElementById('card_lesson');
    const validate = lesson.style.display;
    if (validate === 'none' || validate === '') {
      lesson.style.display = 'block';
    } else {
      lesson.style.display = 'none';
    }
  }

  visibility() {
    const content = document.getElementById('card_cont_lesson');
    const validate = content.style.display;
    if (validate === 'none' || validate === '') {
      content.style.display = 'block';
    } else {
      content.style.display = 'none';
    }
  }
}
