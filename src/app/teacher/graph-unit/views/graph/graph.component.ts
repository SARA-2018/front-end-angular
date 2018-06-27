import { Component, Input, OnInit } from '@angular/core';
import { D3Service } from '../../services/d3.service';
import { Graph } from '../../models/graph.model';

@Component({
  selector: 'app-graph',
  templateUrl: 'graph.component.html',
})
export class GraphComponent implements OnInit {
  @Input('nodes') nodes;
  @Input('links') links;
  graph: Graph;

  constructor(private d3Service: D3Service) { }

  ngOnInit() {
    this.graph = this.d3Service.getGraph(this.nodes, this.links);
  }
}
