import { Component, OnInit } from '@angular/core';
import { ItineraryService } from '../../shared/itinerary.service';
import { DtoConverter } from '../../shared/dto-converter';
import { Itinerary } from '../../shared/itinerary.model';
import { Formation } from '../../shared/formation.model';
import { Lesson } from '../../shared/lesson.model';
import { Session } from '../../shared/session.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

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

  constructor(private itineraryService: ItineraryService, private router: Router, private snackBar: MatSnackBar) {
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

  openFormations(formations): void {
    this.sessions = [];
    this.lessons = [];
    this.formations = [];
    for (const formation of formations) {
      if (!formation.formations) {
        this.sessions.push(formation);
        for (const lesson of formation.getLessons()) {
          this.lessons.push(lesson);
        }
      } else {
        this.formations.push(formation);
      }
    }
  }

  openLesson(lesson: Lesson): void {
    if (lesson.getInteractions().length !== 0) {
      this.router.navigate(['/lesson', lesson.getId()]);
    } else {
      this.snackBar.open('Opss! No existe contenido.', '', {
        duration: 2000
      });
    }
  }
}
