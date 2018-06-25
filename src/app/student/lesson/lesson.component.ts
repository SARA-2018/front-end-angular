import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Itinerary } from '../../teacher/info-unit/models/itinerary.model';
import { DtoConverter } from '../../shared/dto-converter';
import { LessonService } from '../../shared/lesson.service';
import { Interaction } from '../../teacher/info-unit/models/interaction.model';

@Component({
    templateUrl: 'lesson.component.html',
    styleUrls: ['lesson.component.css']
})

export class LessonComponent implements OnInit {

  static URL = 'lesson/:id';
  lessonId: string;
  lessonName: string;
  interactions: Interaction[] = [];

  constructor(private route: ActivatedRoute, private lessonService: LessonService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.lessonId = params['id']);
    this.interaction();
  }

  interaction(): Interaction[] {
    this.lessonService.getById(this.lessonId).subscribe(lessonDto => {
      this.lessonName = lessonDto.name;
      for (const interactionDto of lessonDto.interactions) {
        this.interactions.push(new DtoConverter().convertInteraction(interactionDto));
      }
    });
    return this.interactions;
  }

}

