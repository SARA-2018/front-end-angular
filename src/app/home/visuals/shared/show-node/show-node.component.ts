import { Component, Input } from '@angular/core';
import { Node } from '../../../d3';

@Component({
  selector: '[nodeVisual]',
  templateUrl: 'show-node.component.html',
  styleUrls: ['show-node.component.css']
})
export class NodeVisualComponent {
  @Input('nodeVisual') node: Node;
}