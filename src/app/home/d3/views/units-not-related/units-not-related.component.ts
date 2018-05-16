import { Component, Input, ChangeDetectorRef, HostListener, ChangeDetectionStrategy, OnInit, AfterViewInit } from '@angular/core';
import { D3Service } from '../../d3.service';
import { Graph } from '../../models/graph';
import { Node } from '../../models/node';

@Component({
  selector: 'app-units-not-related',
  templateUrl: 'units-not-related.component.html',
})
export class UnitsNotRelatedComponent implements OnInit {
  @Input('nodes') nodes;
  graph: Graph;

  constructor(private d3Service: D3Service) {}

  ngOnInit() {
    this.graph = this.d3Service.getGraph(this.nodes, null);
  }
}