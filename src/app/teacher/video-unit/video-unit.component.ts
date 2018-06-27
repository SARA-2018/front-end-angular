import { Component, HostBinding, Input, OnChanges } from '@angular/core';
import { Video } from '../info-unit/models/video.model';
import { VideoService } from '../../shared/video.service';
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
    if (!this.displayURL) {
      this.displayURL = sanitizer.bypassSecurityTrustResourceUrl('https://youtu.be/embed/qWWqZUBegNI');
    } else {
      this.displayURL = sanitizer.bypassSecurityTrustResourceUrl(this.displayURL);
    }
  }

  ngOnChanges() {
    this.displayURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.video.getUrl());
  }

  saveVideoUrl() {
    this.displayURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoURL);
    const videoDto: UpdateVideoDto = { url: this.videoURL};
    this.videoService.setUrl(videoDto, this.video.getId()).subscribe();
  }

  close() {
    this.isOpen = false;
  }

  open() {
    this.isOpen = true;
  }
}
