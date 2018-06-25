import { Component, HostBinding, Input, OnChanges } from '@angular/core';
import { VideoService } from '../info-unit/services/video.service';
import { Video } from '../info-unit/models/video.model';

@Component({
  selector: 'app-video-unit',
  templateUrl: 'video-unit.component.html',
  styleUrls: ['video-unit.component.css']
})

export class VideoUnitComponent implements OnChanges {

  videoURL = '';
  @Input() video: Video;
  @HostBinding('class.is-open')
  isOpen = false;

  constructor(private videoService: VideoService) {
  }

  ngOnChanges() {
    console.log(this.video);
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  saveVideoUrl() {
    const video = new Video(this.videoURL);
    // this.videoService.create(video).subscribe();
  }

  getVideoURL() {
    return this.videoURL;
  }
}
