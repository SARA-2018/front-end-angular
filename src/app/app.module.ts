import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkTableModule } from '@angular/cdk/table';
import { CoreModule } from './core/core.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpService } from './core/http.service';
import { NgModule } from '@angular/core';
import { UnitService } from './teacher/graph-unit/services/unit.service';
import { DraggableDirective } from './teacher/d3/directives/draggable.directive';
import { GraphComponent } from './teacher/d3/views/graph/graph.component';
import { LinkComponent } from './teacher/d3/views/link/link.component';
import { NodeComponent } from './teacher/d3/views/node/node.component';
import { UnitsNotRelatedComponent } from './teacher/d3/views/units-not-related/units-not-related.component';
import { ZoomableDirective } from './teacher/d3/directives/zoomable.directive';
import { RelationService } from './teacher/graph-unit/services/relation.service';
import { D3Service } from './teacher/d3/d3.service';
import { AppMaterialModule } from './app-material.module';

@NgModule({
  imports: [
    AppRoutingModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    BrowserModule,
    CdkTableModule,
    CoreModule,
    FlexLayoutModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AppComponent,
    AppRoutingModule.COMPONENTS,
    AppRoutingModule.DIALOGS_COMPONENTS,
    DraggableDirective,
    GraphComponent,
    LinkComponent,
    NodeComponent,
    UnitsNotRelatedComponent,
    ZoomableDirective,
  ],
  entryComponents: [AppRoutingModule.DIALOGS_COMPONENTS],
  bootstrap: [AppComponent],
  providers: [
    D3Service,
    HttpService,
    UnitService,
    RelationService,
  ]

})

export class AppModule {
}
