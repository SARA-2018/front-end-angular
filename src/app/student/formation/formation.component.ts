import { Component, OnInit } from '@angular/core';
import { ItineraryService } from '../../shared/itinerary.service';
import { DtoConverter } from '../../shared/dto-converter';
import { Itinerary } from '../../teacher/info-unit/models/itinerary.model';
import { Formation } from '../../teacher/info-unit/models/formation.model';
import { Lesson } from '../../teacher/info-unit/models/lesson.model';
import { Session } from '../../teacher/info-unit/models/session.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-formation',
    templateUrl: 'formation.component.html',
    styleUrls: ['formation.component.css']
})

export class FormationComponent implements OnInit {

  itinerarys: Itinerary[] = [];

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
