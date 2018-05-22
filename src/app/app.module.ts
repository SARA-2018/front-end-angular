import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkTableModule } from '@angular/cdk/table';
import { CoreModule } from './core/core.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HttpService } from './core/http.service';
import { NgModule } from '@angular/core';
import { UnitService } from './teacher/shared/services/unit.service';
import { D3Service } from './teacher/d3/d3.service';
import { DraggableDirective } from './teacher/d3/directives/draggable.directive';
import { GraphComponent } from './teacher/d3/views/graph/graph.component';
import { LinkComponent } from './teacher/d3/views/link/link.component';
import { NodeComponent } from './teacher/d3/views/node/node.component';
import { UnitsNotRelatedComponent } from './teacher/d3/views/units-not-related/units-not-related.component';
import { ZoomableDirective } from './teacher/d3/directives/zoomable.directive';

import {
  MatAutocompleteModule, MatButtonModule, MatButtonToggleModule,
  MatCardModule, MatCheckboxModule, MatChipsModule,
  MatDatepickerModule, MatDialogModule, MatExpansionModule,
  MatGridListModule, MatIconModule, MatInputModule,
  MatListModule, MatMenuModule, MatNativeDateModule,
  MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule,
  MatRadioModule, MatRippleModule, MatSelectModule,
  MatSidenavModule, MatSliderModule, MatSlideToggleModule,
  MatSnackBarModule, MatSortModule, MatTableModule,
  MatTabsModule, MatToolbarModule, MatTooltipModule,
  MatStepperModule,
} from '@angular/material';
import {RelationService} from './teacher/shared/services/relation.service';
import {Lexical} from './teacher/shared/models/lexical.model';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CdkTableModule,
    CoreModule,
    FlexLayoutModule,
    FormsModule,
    HttpModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatStepperModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
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
    Lexical,
  ]

})

export class AppModule {
}
