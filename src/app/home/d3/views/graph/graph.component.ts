import { Component, Input, ChangeDetectorRef, HostListener, ChangeDetectionStrategy, OnInit, AfterViewInit } from '@angular/core';
import { D3Service } from '../../d3.service';
import { Graph } from '../../models/graph';
import { Node } from '../../models/node';

@Component({
  selector: 'app-graph',
  templateUrl: 'graph.component.html',
})
export class GraphComponent implements OnInit {
  @Input('nodes') nodes;
  @Input('links') links;
  graph: Graph;

  constructor(private d3Service: D3Service) {}

  ngOnInit() {
    this.graph = this.d3Service.getGraph(this.nodes, this.links);
  }
}
