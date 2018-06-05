import { Component} from '@angular/core';

@Component({
  selector: 'app-info-unit',
  templateUrl: 'info-unit.component.html',
  styleUrls: ['info-unit.component.css']
})

export class InfoUnitComponent {

  public values: number[] = [0];
  public values2: number[] = [0];

  constructor() {
  }

  visibilityLesson() {
    this.values.push(this.values.length + 1);
    /*
    const lesson = document.getElementById('card_lesson');
    const validate = lesson.style.display;
    if (validate === 'none' || validate === '') {
      lesson.style.display = 'block';
    } else {
      lesson.style.display = 'none';
    }*/
  }

  visibility() {
    this.values2.push(this.values2.length + 1);
    /*const content = document.getElementById('card_cont_lesson');
    const validate = content.style.display;
    if (validate === 'none' || validate === '') {
      content.style.display = 'block';
    } else {
      content.style.display = 'none';
    }*/
  }
}
