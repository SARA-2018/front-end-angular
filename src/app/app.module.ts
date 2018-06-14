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
import { UnitService } from './teacher/shared/unit.service';
import { DraggableDirective } from './teacher/graph-unit/directives/draggable.directive';
import { GraphComponent } from './teacher/graph-unit/views/graph/graph.component';
import { LinkComponent } from './teacher/graph-unit/views/graph/link/link.component';
import { NodeComponent } from './teacher/graph-unit/views/graph/node/node.component';
import { UnitsNotRelatedComponent } from './teacher/graph-unit/views/units-not-related/units-not-related.component';
import { ZoomableDirective } from './teacher/graph-unit/directives/zoomable.directive';
import { RelationService } from './teacher/graph-unit/services/relation.service';
import { D3Service } from './teacher/graph-unit/services/d3.service';
import { AppMaterialModule } from './app-material.module';
import { MessageItemComponent } from './teacher/exercise-unit/chat-exercise/message-item/message-item.component';

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
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    AppRoutingModule.COMPONENTS,
    AppRoutingModule.DIALOGS_COMPONENTS,
    DraggableDirective,
    GraphComponent,
    LinkComponent,
    MessageItemComponent,
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
