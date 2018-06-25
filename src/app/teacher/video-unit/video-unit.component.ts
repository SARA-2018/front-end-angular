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

  toggle() {
    this.isOpen = !this.isOpen;
  }

  saveVideoUrl() {
    this.video.setUrl(this.videoURL);
    this.videoService.setUrl(this.video).subscribe();
    // this.videoService.create(video).subscribe();
  }

  getVideoURL() {
    return this.video.getUrl();
  }
}
