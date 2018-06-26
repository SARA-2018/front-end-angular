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
import { MessageComponent } from './teacher/exercise-unit/chat-exercise/message/message.component';
import { ItineraryService } from './shared/itinerary.service';
import { SessionService } from './teacher/info-unit/services/session.service';
import { LessonService } from './shared/lesson.service';
import { SessionComponent } from './teacher/info-unit/sessions/session.component';
import { InteractionComponent } from './student/lesson/interaction.component';
import { ExerciseService} from './shared/exercise.service';
import { VideoService } from './shared/video.service';
import { LessonComponent } from './teacher/info-unit/lessons/lesson.component';
import { VideoStudentComponent } from './student/lesson/video/video.component';
import { ExerciseStudentComponent } from './student/lesson/exercise/exercise.component';

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
    InteractionComponent,
    LinkComponent,
    MessageComponent,
    NodeComponent,
    UnitsNotRelatedComponent,
    SessionComponent,
    ZoomableDirective,
    LessonComponent,
    VideoStudentComponent,
    ExerciseStudentComponent
  ],
  entryComponents: [AppRoutingModule.DIALOGS_COMPONENTS],
  bootstrap: [AppComponent],
  providers: [
    D3Service,
    HttpService,
    UnitService,
    RelationService,
    ItineraryService,
    SessionService,
    LessonService,
    VideoService,
    ExerciseService
  ]

})

export class AppModule {
}
