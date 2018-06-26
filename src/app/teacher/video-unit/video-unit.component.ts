import { Component, HostBinding, Input, OnChanges } from '@angular/core';
import { Video } from '../info-unit/models/video.model';
import { VideoService } from '../info-unit/services/video.service';
import { DomSanitizer } from '@angular/platform-browser';
import { UpdateVideoDto } from '../info-unit/dtos/update-video.dto';

@Component({
  selector: 'app-video-unit',
  templateUrl: 'video-unit.component.html',
  styleUrls: ['video-unit.component.css']
})

export class VideoUnitComponent implements OnChanges {

  displayURL;
  videoURL;
  @Input() video: Video;
  @HostBinding('class.is-open')
  isOpen = false;

  constructor(private sanitizer: DomSanitizer, private videoService: VideoService) {
    console.log(this.displayURL);
    if (!this.displayURL) {
      this.displayURL = sanitizer.bypassSecurityTrustResourceUrl('https://youtu.be/embed/qWWqZUBegNI');
    } else {
      this.displayURL = sanitizer.bypassSecurityTrustResourceUrl(this.displayURL);
    }
  }

  ngOnChanges() {
    console.log(this.video.getUrl());
    this.displayURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.video.getUrl());
  }

  close() {
    this.isOpen = false;
  }

  open() {
    this.isOpen = true;
  }

  saveVideoUrl() {
    this.displayURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoURL);
    // this.video.setUrl(this.videoURL);
    const videoDto: UpdateVideoDto = { url: this.videoURL};
    this.videoService.setUrl(videoDto, this.video.getId()).subscribe();
  }

  getVideoURL() {
    if (this.video) {
      return this.displayURL;
    }
  }
}
