import { Component, Input } from '@angular/core';
import { Node } from '../../../models/node.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[showNode]',
  templateUrl: 'node.component.html',
  styleUrls: ['node.component.css']
})
export class NodeComponent {
  // tslint:disable-next-line:no-input-rename
  @Input('showNode') node: Node;
}
