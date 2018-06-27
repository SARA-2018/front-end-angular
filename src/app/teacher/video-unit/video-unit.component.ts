import { Component, HostBinding, Input, OnChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Video } from '../../shared/models/video.model';
import { VideoService } from '../../shared/services/video.service';


@Component({
  selector: 'app-video-unit',
  templateUrl: 'video-unit.component.html',
  styleUrls: ['video-unit.component.css']
})

export class VideoUnitComponent implements OnChanges {

  displayURL;
  videoCode: string;
  @Input() video: Video;
  @HostBinding('class.is-open')
  isOpen = false;

  constructor(private sanitizer: DomSanitizer, private videoService: VideoService) { }

  ngOnChanges() {
    if (this.video) {
      this.displayURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.video.getUrl());
    }
  }

  saveVideo() {
    this.displayURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.generateYoutubeLink(this.videoCode));
    this.video.setUrl(this.generateYoutubeLink(this.videoCode));
    this.videoService.update(this.video).subscribe();
  }

  generateYoutubeLink(videoCode: string): string {
    return 'https://www.youtube.com/embed/' + videoCode;
  }

  close() {
    this.isOpen = false;
  }

  open() {
    this.isOpen = true;
  }
}
