import { Component} from '@angular/core';

@Component({
  selector: 'app-info-unit',
  templateUrl: 'info-unit.component.html',
  styleUrls: ['info-unit.component.css']
})

export class InfoUnitComponent {

  public sessions: number[] = [1];
  public itinerarys: number[] = [0];

  constructor() {
  }
  toArray(n: number): number[] {
    return Array(n);
  }

  visibilityLesson() {
    this.sessions.push(1);
  }

  visibility(sessionId: number) {
    this.sessions[sessionId] = this.sessions[sessionId] + 1;
  }
  addItinerary() {
    this.itinerarys.push(0);
  }
}
