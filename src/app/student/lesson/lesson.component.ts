import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Itinerary } from '../../teacher/info-unit/models/itinerary.model';
import {DtoConverter, DtoConverter} from '../../shared/dto-converter';
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
    console.log(this.interactions.length);
  }

   interaction() {
    this.lessonService.getById(this.lessonId).subscribe(lessonDto => {
      this.lessonName = lessonDto.name;
      console.log(lessonDto);
      const interactions: InteractionDto[] = lessonDto.interactions;
      for (let i = 0; i < interactions.length; i++) {
        console.log(interactions[i]);
        if (interactions[i].video) {
          console.log('Soy video.')
           this.videoService.getById(interactions[i].video.id).subscribe(videoDto => {
            console.log(videoDto)
            this.interactions.push(this.dtoConverte.convertVideo(videoDto));
          });
        } else {
          console.log('Soy ejercicio')
          this.exerciseService.getById(interactions[i].exercise.id).subscribe(exerciseDto => {
            console.log(exerciseDto)
            this.interactions.push(this.dtoConverte.convertExercise(exerciseDto));

          });
        }
      }
    });
   //  console.log(this.interactions);
  }


  isExercise(interaction: Interaction) {
    return interaction.isExercise();
  }

  isVideo(interaction: Interaction) {
    return !interaction.isExercise();
  }
}

