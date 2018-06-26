import { Component, HostBinding, Input, OnChanges } from '@angular/core';
import { Video } from '../info-unit/models/video.model';
import { VideoService } from '../info-unit/services/video.service';

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
    if (this.video) {
      this.videoURL = this.video.getUrl();
    }
  }

  close() {
    this.isOpen = false;
  }

  open() {
    this.isOpen = true;
  }

  saveVideoUrl() {
    this.video.setUrl(this.videoURL);
    console.log(this.video);
    this.videoService.setUrl(this.video).subscribe();
  }

  getVideoURL() {
    if (this.video) {
      return this.video.getUrl();
    }
  }
}
