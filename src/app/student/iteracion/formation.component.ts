import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ItineraryService } from '../../shared/itinerary.service';
import {DtoConverter} from '../../shared/dto-converter';
import {SessionDto} from '../../shared/dtos/session.dto';
import {Itinerary} from '../../teacher/info-unit/models/itinerary.model';
import {Formation} from '../../teacher/info-unit/models/formation.model';
import {FormationDialogComponent} from './formation-dialog.component';
import {Lesson} from '../../teacher/info-unit/models/lesson.model';
import {Session} from '../../teacher/info-unit/models/session.model';

@Component({
    selector: 'app-formation',
    templateUrl: 'formation.component.html',
    styleUrls: ['formation.component.css']
})

export class FormationComponent implements OnInit {

  itinerarys: Itinerary[] = [];
  sessions: Session[] = [];
  lessons: Lesson[] = [];

  constructor(public dialog: MatDialog, private itineraryService: ItineraryService) {
  }

  ngOnInit(): void {
    this.itinerary();
  }

  itinerary(): Itinerary[] {
    this.itineraryService.getAll().subscribe(itinerarysDto => {
      for (const itineraryDto of itinerarysDto) {
        this.itinerarys.push(new DtoConverter().convertItinerary(itineraryDto.itinerary));
      }
    });
    return this.itinerarys;
  }

  openItineraryInfo(formations) {
    this.sessions = [];
    this.lessons = [];
    for (const formation of formations) {
      if (!formation.formations) { // session
        this.sessions.push(formation);
        for (const lesson of formation.getLessons()) {
          this.lessons.push(lesson);
        }
        console.log(this.sessions);
        this.dialog.open(FormationDialogComponent, {data: {sessions: this.sessions, lessons: this.lessons}}).afterClosed().subscribe();
      } else {
        console.log(formation);
      }
    }
  }

}
