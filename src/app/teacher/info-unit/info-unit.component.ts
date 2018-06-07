import { Component} from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { InputDialogComponent } from './input-dialog.component';
import { Itinerary } from './models/itinerary.model';

@Component({
  selector: 'app-info-unit',
  templateUrl: 'info-unit.component.html',
  styleUrls: ['info-unit.component.css']
})

export class InfoUnitComponent {

  public sessions: number[] = [1];
  public itinerarys: Itinerary[] = [];

  constructor(public dialog: MatDialog) {
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
    // this.itinerarys.push(0);
    const name: String = '';
    this.dialog.open(InputDialogComponent, {data: {name: name}}).afterClosed().subscribe(
      result => {
        if (result) {
          console.log( result);
          const itinerary: Itinerary = new Itinerary();
          itinerary.setName(result);
          this.itinerarys.push(itinerary);
          console.log(itinerary.getName());
        }
      }
    );
  }


}
