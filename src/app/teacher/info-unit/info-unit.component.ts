import { Component, Input} from '@angular/core';
import { Unit } from '../graph-unit/models/unit.model';

@Component({
  selector: 'app-info-unit',
  templateUrl: 'info-unit.component.html',
  styleUrls: ['info-unit.component.css']
})

export class InfoUnitComponent {

  public sessions: number[] = [1];
  public itinerarys: number[] = [0];

  @Input() unit: Unit;

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
