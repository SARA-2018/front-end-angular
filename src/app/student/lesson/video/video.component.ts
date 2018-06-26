import {Component, Input, OnInit} from '@angular/core';
import { VideoService } from '../../../shared/video.service';
import {Video} from '../../../teacher/info-unit/models/video.model';

@Component({
    selector: 'app-video',
    templateUrl: 'video.component.html',
    styleUrls: ['video.component.css']
})

export class VideoComponent implements OnInit{

  @Input() video: Video;


  constructor() {
  }

  ngOnInit(): void {
    console.log('---------------Soy video-----------------')
    console.log(this.video);
  }

}

