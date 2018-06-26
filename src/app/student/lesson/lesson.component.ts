import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Itinerary } from '../../teacher/info-unit/models/itinerary.model';
import {DtoConverter} from '../../shared/dto-converter';
import { LessonService } from '../../shared/lesson.service';
import { Interaction } from '../../teacher/info-unit/models/interaction.model';
import {VideoService} from '../../shared/video.service';
import {ExerciseService} from '../../shared/exercise.service';
import {InteractionDto} from '../../shared/dtos/interaction.dto';

@Component({
    templateUrl: 'lesson.component.html',
    styleUrls: ['lesson.component.css']
})

export class LessonComponent implements OnInit {

  static URL = 'lesson/:id';
  lessonId: string;
  lessonName: string;
  interactions: Interaction[] = [];
  dtoConverte: DtoConverter;

  constructor(private route: ActivatedRoute, private lessonService: LessonService, private router: Router, private videoService: VideoService,
              private exerciseService: ExerciseService) {
    this.dtoConverte = new DtoConverter();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.lessonId = params['id']);
    this.interaction();
  }

   interaction() {
    this.lessonService.getById(this.lessonId).subscribe(lessonDto => {
      this.lessonName = lessonDto.name;
      const interactions: InteractionDto[] = lessonDto.interactions;
      for (let i = 0; i < interactions.length; i++) {
        if (interactions[i].video) {
           this.videoService.getById(interactions[i].video.id).subscribe(videoDto => {
            this.interactions.push(this.dtoConverte.convertVideo(videoDto));
          });
        } else {
          this.exerciseService.getById(interactions[i].exercise.id).subscribe(exerciseDto => {
            this.interactions.push(this.dtoConverte.convertExercise(exerciseDto));

          });
        }
      }
    });
  }


  isExercise(interaction: Interaction) {
    return interaction.isExercise();
  }

  isVideo(interaction: Interaction) {
    return !interaction.isExercise();
  }
}

