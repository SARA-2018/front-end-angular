import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ItineraryService } from '../../shared/itinerary.service';
import { DtoConverter } from '../../shared/dto-converter';
import { Itinerary } from '../../teacher/info-unit/models/itinerary.model';
import { Formation } from '../../teacher/info-unit/models/formation.model';
import { Lesson } from '../../teacher/info-unit/models/lesson.model';
import { Session } from '../../teacher/info-unit/models/session.model';
import {Router} from '@angular/router';

@Component({
    selector: 'app-formation',
    templateUrl: 'formation.component.html',
    styleUrls: ['formation.component.css']
})

export class FormationComponent implements OnInit {

  itinerarys: Itinerary[] = [];
  sessions: Session[] = [];
  lessons: Lesson[] = [];
  formations: Formation[] = [];

  constructor(public dialog: MatDialog, private itineraryService: ItineraryService,  private router: Router) {
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

  openItineraryInfo(formations): void {
    this.sessions = [];
    this.lessons = [];
    this.formations = [];
    for (const formation of formations) {
      if (!formation.formations) { // session
        this.sessions.push(formation);
        for (const lesson of formation.getLessons()) {
          this.lessons.push(lesson);
        }
      } else {
        this.formations.push(formation);
      }
    }
  }
  sendMeHome(lesson) {
    this.router.navigate(['/lesson', lesson.getId()]);
  }

}
