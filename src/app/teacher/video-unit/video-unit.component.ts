import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-video-unit',
  templateUrl: 'video-unit.component.html',
  styleUrls: ['video-unit.component.css']
})

export class VideoUnitComponent {

  constructor() {
  }

  @HostBinding('class.is-open')
  isOpen: Boolean = false;

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
