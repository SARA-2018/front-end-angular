import { Component, HostBinding, Input, OnChanges } from '@angular/core';
import { Video } from '../info-unit/models/video.model';
import { VideoService } from '../../shared/video.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-video-unit',
  templateUrl: 'video-unit.component.html',
  styleUrls: ['video-unit.component.css']
})

export class VideoUnitComponent implements OnChanges {

  displayURL;
  @Input() video: Video;
  @HostBinding('class.is-open')
  isOpen = false;

  constructor(private sanitizer: DomSanitizer) {

  }

  ngOnChanges() {
    console.log(this.video.getUrl());
    if (this.video.getUrl()) {
    this.displayURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.video.getUrl());
    } else {
      this.displayURL = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/watch?v=FzG4uDgje3M');
    }
  }

  close() {
    this.isOpen = false;
  }

  open() {
    this.isOpen = true;
  }

  saveVideoUrl() {
    // this.video.setUrl(this.videoURL);
    // this.videoService.setUrl(this.video).subscribe();
  }

  getVideoURL() {
    if (this.video) {
      return this.displayURL;
    }
  }
}
