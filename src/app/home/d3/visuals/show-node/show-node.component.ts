import { Component, Input } from '@angular/core';
import { Node } from '../../../d3/models/node';

@Component({
  selector: '[showNode]',
  templateUrl: 'show-node.component.html',
  styleUrls: ['show-node.component.css']
})
export class ShowNodeComponent {
  @Input('showNode') node: Node;
}
