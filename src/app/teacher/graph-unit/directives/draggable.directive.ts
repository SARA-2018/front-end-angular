import { Directive, Input, ElementRef, OnInit } from '@angular/core';
import { Node } from '../models/node.model';
import { Graph} from '../models/graph.model';
import { D3Service } from '../services/d3.service';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[draggableNode]'
})
export class DraggableDirective implements OnInit {
    @Input('draggableNode') draggableNode: Node;
    @Input('draggableInGraph') draggableInGraph: Graph;

    constructor(private d3Service: D3Service, private _element: ElementRef) { }

    ngOnInit() {
        this.d3Service.applyDraggableBehaviour(this._element.nativeElement, this.draggableNode, this.draggableInGraph);
    }
}
