import { Component, Input } from '@angular/core';
import { Unit } from '../graph-unit/models/unit.model';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { InputDialogComponent } from './input-dialog.component';
import { Itinerary } from './models/itinerary.model';
import { Session } from './models/session.model';
import { Formation } from './models/formation.model';
import { Lesson } from './models/lesson.model';
import { Interaction } from './models/interaction.model';

@Component({
  selector: 'app-info-unit',
  templateUrl: 'info-unit.component.html',
  styleUrls: ['info-unit.component.css']
})

export class InfoUnitComponent {

  public itinerarys: Itinerary[] = [];

  @Input() unit: Unit;

  constructor(public dialog: MatDialog) {
  }

  toArray(n: number): number[] {
    return Array(n);
  }

  visibilityLesson() {
    // this.sessions.push(1);
  }

  visibility(sessionId: number) {
    // this.sessions[sessionId] = this.sessions[sessionId] + 1;
  }

  addLesson(itineraryIndex: number, sessionIndex: number) {
    const name: String = '';
    const message: String = 'Nombre de la leccion';
    this.dialog.open(InputDialogComponent, { data: { name: name, message: message } }).afterClosed().subscribe(
      result => {
        if (result) {
          const lesson: Lesson = new Lesson(result);
          const formationArray: Formation[] = this.itinerarys[itineraryIndex].getFormations();
          const session: Session = <Session>formationArray[sessionIndex];
          const lessonArray: Lesson[] = session.getLessons();
          lessonArray.push(lesson);
          session.setLessons(lessonArray);

        }
      }
    );
  }

  addSession(itineraryIndex: number) {
    const name: String = '';
    const message: String = 'Nombre de la session';
    this.dialog.open(InputDialogComponent, { data: { name: name, message: message } }).afterClosed().subscribe(
      result => {
        if (result) {
          const session: Session = new Session(result);
          const formationArray: Formation[] = this.itinerarys[itineraryIndex].getFormations();
          formationArray.push(<Formation>session);
          this.itinerarys[itineraryIndex].setFormations(formationArray);
        }
      }
    );
  }

  addItinerary() {
    // this.itinerarys.push(0);
    const name: String = '';
    const message: String = 'Nombre del itinerario';
    this.dialog.open(InputDialogComponent, { data: { name: name, message: message } }).afterClosed().subscribe(
      result => {
        if (result) {
          console.log(result);
          const itinerary: Itinerary = new Itinerary();
          itinerary.setName(result);
          this.itinerarys.push(itinerary);
          console.log(itinerary.getName());
        }
      }
    );
  }

}
