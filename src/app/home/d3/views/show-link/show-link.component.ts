import { Component, Input } from '@angular/core';
import { Link } from '../../../d3/models/link';

@Component({
  selector: '[showLink]',
  templateUrl: 'show-link.component.html',
  styleUrls: ['show-link.component.css']
})
export class ShowLinkComponent  {
  @Input('showLink') link: Link;
}
