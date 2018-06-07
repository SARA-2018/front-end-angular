import { Component, Input } from '@angular/core';
import { Link } from '../../../models/link.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[showLink]',
  templateUrl: 'link.component.html',
  styleUrls: ['link.component.css']
})
export class LinkComponent  {
  // tslint:disable-next-line:no-input-rename
  @Input('showLink') link: Link;
}
