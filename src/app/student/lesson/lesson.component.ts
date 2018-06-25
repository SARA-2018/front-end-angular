import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Itinerary } from '../../teacher/info-unit/models/itinerary.model';
import { DtoConverter } from '../../shared/dto-converter';
import { LessonService } from '../../shared/lesson.service';
import { Interaction } from '../../teacher/info-unit/models/interaction.model';
import {ExerciseComponent} from './exercise/exercise.component';
import {VideoComponent} from './video/video.component';

@Component({
    templateUrl: 'lesson.component.html',
    styleUrls: ['lesson.component.css']
})

export class LessonComponent implements OnInit {

  static URL = 'lesson/:id';
  lessonId: string;
  lessonName: string;
  interactions: Interaction[] = [];

  constructor(private route: ActivatedRoute, private lessonService: LessonService, private router: Router) {
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

  showInteraction(interaction: Interaction) {
    console.log(interaction);
    if (interaction.isExercise()) {
     // this.router.navigate(['/video', 'dskf']);
      console.log('es un ejercio');
    } else {
      console.log('video');
    //  this.router.navigate(['/video', 'dskf']);
    }

  }

}

