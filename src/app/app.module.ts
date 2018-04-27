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
import { UnitService } from './home/shared/unit.service';
import { D3Service } from './home/d3';
import { GraphComponent } from './home/visuals/graph/graph.component';
import { ShowLinkComponent } from './home/visuals/shared/show-link/show-link.component';
import { ShowNodeComponent } from './home/visuals/shared/show-node/show-node.component';


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
import { DraggableDirective } from './home/d3/directives/draggable.directive';
import { ZoomableDirective } from './home/d3/directives/zoomable.directive';

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
    GraphComponent,
    ShowLinkComponent,
    ShowNodeComponent,
    ZoomableDirective,
    DraggableDirective,
  ],
  entryComponents: [AppRoutingModule.DIALOGS_COMPONENTS],
  bootstrap: [AppComponent],
  providers: [
    HttpService,
    UnitService,
    D3Service
  ]

})

export class AppModule {
}
