import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Itinerary } from '../shared/models/itinerary.model';
import { ItineraryService } from '../shared/services/itinerary.service';
import { DtoConverter } from '../shared/dto-converter';
import { Lesson } from '../shared/models/lesson.model';

@Component({
  selector: 'app-student',
  templateUrl: 'student.component.html',
  styleUrls: ['student.component.css']
})

export class StudentComponent implements OnInit {

  static URL = 'student';
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
