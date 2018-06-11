import { Component, Input } from '@angular/core';
import { Unit } from '../graph-unit/models/unit.model';
import { MatDialog, MatSnackBar } from '@angular/material';
import { InputDialogComponent } from './input-dialog.component';
import { Itinerary } from './models/itinerary.model';
import { Session } from './models/session.model';
import { Formation } from './models/formation.model';
import { Lesson } from './models/lesson.model';
import {ExerciseUnitComponent} from '../exercise-unit/exercise-unit.component';
import {VideoUnitComponent} from '../video-unit/video-unit.component';
import {GraphUnitComponent} from '../graph-unit/graph-unit.component';

@Component({
  selector: 'app-info-unit',
  templateUrl: 'info-unit.component.html',
  styleUrls: ['info-unit.component.css']
})

export class InfoUnitComponent {

  public itinerarys: Itinerary[] = [];

  @Input() unit: Unit;
  @Input() exerciseUnit: ExerciseUnitComponent;
  @Input() graphUnit: GraphUnitComponent;
  @Input() videoUnit: VideoUnitComponent;
  formatting = {color: 'green', 'background-color': '#d0e9c6'};
  input: any = '{\n "Cuando": "",\n \"Donde\": "",\n "Quien ": "",\n "Porqué": "",\n "Que": "",\n "Para que": "" \n}';

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar) {
  }

  toArray(n: number): number[] {
    return Array(n);
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

  addExercise() {
    this.graphUnit.toggle();
    this.exerciseUnit.toggle();
    if (this.videoUnit['isOpen'] === true) {
      this.graphUnit.toggle();
      this.videoUnit.toggle();
    }
  }

  addVideo() {
    this.videoUnit.toggle();
    this.graphUnit.toggle();
    if (this.exerciseUnit['isOpen'] === true) {
      this.graphUnit.toggle();
      this.exerciseUnit.toggle();
    }
  }
  saveUnitContent() {
    if (this.verify()) {
      console.log('JSON BIEN');
    } else {
      console.log('JSON MAL');
    }
  }
  verify(): boolean {
    try {
      JSON.parse(this.input);
      return true;
    } catch (e) {
      this.snackBar.open(e.message, '', {
        duration: 5000
      });
      const eMesage: string[] = e.message.split(' ');
      this.input = this.input.split('');
      this.input.splice(Number(eMesage[eMesage.length - 1]) - 2, 0, '←');
      let inputString = '';
      this.input.forEach(element => {
        inputString += element;
      });
      this.input = inputString;
      return false;
    }
  }
}
