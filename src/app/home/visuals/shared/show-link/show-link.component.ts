import { Component, Input } from '@angular/core';
import { Link } from '../../../d3';

@Component({
  selector: '[linkVisual]',
  templateUrl: 'show-link.component.html',
  styleUrls: ['show-link.component.css']
})
export class LinkVisualComponent  {
  @Input('linkVisual') link: Link;
}
