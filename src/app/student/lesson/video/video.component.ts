import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {DtoConverter} from '../../../shared/dto-converter';
import {LessonService} from '../../../shared/lesson.service';
import {Interaction} from '../../../teacher/info-unit/models/interaction.model';
import {Video} from '../../../teacher/info-unit/models/video.model';
import {VideoService} from '../../../shared/video.service';

@Component({
    templateUrl: 'video.component.html',
    styleUrls: ['video.component.css']
})

export class VideoComponent implements OnInit {

  static URL = 'video/:id';
  videoId: string;


  constructor(private route: ActivatedRoute, private videoService: VideoService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.videoId = params['id']);
    this.video();
  }

  video(): void {
    this.videoService.getById(this.videoId).subscribe(videoDto => {
      console.log(videoDto.url);
      /*for (const interactionDto of videoDto.interactions) {
        this.interactions.push(new DtoConverter().convertInteraction(interactionDto));
        if (interactionDto.video) {
          this.interactionType.push('Vídeo');
        } else {
          this.interactionType.push('Ejercicio');
        }
      }*/
    });

  }
}

