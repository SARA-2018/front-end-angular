import { Component, Input, OnInit } from '@angular/core';
import { D3Service } from '../../services/d3.service';
import { Graph } from '../../models/graph.model';

@Component({
  selector: 'app-units-not-related',
  templateUrl: 'units-not-related.component.html',
})
export class UnitsNotRelatedComponent implements OnInit {
  @Input('nodes') nodes;
  graph: Graph;

  constructor(private d3Service: D3Service) { }

  ngOnInit() {
    this.graph = this.d3Service.getGraph(this.nodes, null);
  }
}
