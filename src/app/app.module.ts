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
import { UnitService } from './shared/unit.service';
import { RelationService } from './teacher/graph-unit/services/relation.service';
import { D3Service } from './teacher/graph-unit/services/d3.service';
import { AppMaterialModule } from './app-material.module';
import { ItineraryService } from './shared/itinerary.service';
import { SessionService } from './teacher/info-unit/services/session.service';
import { LessonService } from './shared/lesson.service';
import { ExerciseService } from './shared/exercise.service';
import { VideoService } from './shared/video.service';

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
    AppRoutingModule.DIALOGS_COMPONENTS
  ],
  entryComponents: [AppRoutingModule.DIALOGS_COMPONENTS],
  bootstrap: [AppComponent],
  providers: [
    D3Service,
    ExerciseService,
    HttpService,
    ItineraryService,
    LessonService,
    RelationService,
    SessionService,
    UnitService,
    VideoService,
  ]

})

export class AppModule {
}
