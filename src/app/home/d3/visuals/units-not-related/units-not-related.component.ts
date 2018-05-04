import { Component, Input, ChangeDetectorRef, HostListener, ChangeDetectionStrategy, OnInit, AfterViewInit } from '@angular/core';
import { D3Service } from '../../d3.service';
import { ForceDirectedGraph } from '../../models/force-directed-graph';
import { Node } from '../../models/node';

@Component({
  selector: 'app-units-not-related',
  templateUrl: 'units-not-related.component.html',
})
export class UnitsNotRelatedComponent implements OnInit {
  @Input('nodes') nodes;
  graph: ForceDirectedGraph;
  private _options: { width, height } = { width: 400, height: 400 };

  constructor(private d3Service: D3Service, private ref: ChangeDetectorRef) {}

  ngOnInit() {
    /** Receiving an initialized simulated graph from our custom d3 service */
    this.graph = this.d3Service.getForceDirectedGraph(this.nodes, null, this._options);
  }
}
