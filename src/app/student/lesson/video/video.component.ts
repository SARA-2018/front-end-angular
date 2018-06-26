import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../../../shared/video.service';
import {Exercise} from '../../../teacher/shared/exercise.model';
import {Video} from '../../../teacher/info-unit/models/video.model';

@Component({
    selector: 'app-video',
    templateUrl: 'video.component.html',
    styleUrls: ['video.component.css']
})

export class VideoComponent {

  static URL = 'video/:id';
  @Input() video: Video;


  constructor() {
    console.log('---------------Soy video-----------------')
    console.log(this.video);
  }


}

