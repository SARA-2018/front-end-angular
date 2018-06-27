import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DtoConverter } from '../../shared/dto-converter';
import { LessonService } from '../../shared/lesson.service';
import { Interaction } from '../../teacher/info-unit/models/interaction.model';
import { VideoService } from '../../shared/video.service';
import { ExerciseService } from '../../shared/exercise.service';
import { InteractionDto } from '../../shared/dtos/interaction.dto';
import { StudentComponent } from '../student.component';

@Component({
  templateUrl: 'interaction.component.html',
  styleUrls: ['interaction.component.css']
})

export class InteractionComponent implements OnInit {

  static URL = 'lesson/:id';
  lessonId: string;
  lessonName: string;
  interactions: Interaction[] = [];

  constructor(private route: ActivatedRoute, private router: Router,
    private lessonService: LessonService,
    private videoService: VideoService,
    private exerciseService: ExerciseService) {
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
            this.interactions.push(new DtoConverter().convertVideo(videoDto));
          });
        } else {
          this.exerciseService.getById(interactions[i].exercise.id).subscribe(exerciseDto => {
            this.interactions.push(new DtoConverter().convertExercise(exerciseDto));

          });
        }
      }
    });
  }

  exit() {
    this.router.navigate([StudentComponent.URL]);
  }
}

