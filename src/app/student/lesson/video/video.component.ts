import { Component, Input, OnInit } from '@angular/core';
import { Video } from '../../../teacher/info-unit/models/video.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-video',
    templateUrl: 'video.component.html',
    styleUrls: ['video.component.css']
})

export class VideoStudentComponent implements OnInit {

  @Input() video: Video;
  displayURL;
  constructor(private sanitizer: DomSanitizer) {
  }


  ngOnInit(): void {
    this.displayURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.video.getUrl());
  }

}

