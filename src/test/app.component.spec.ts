import { TestBed, async } from '@angular/core/testing';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkTableModule } from '@angular/cdk/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule } from '@angular/core';

import { APP_BASE_HREF } from '@angular/common';
import { AppRoutingModule } from '../app/app-routing.module';
import { CoreModule } from '../app/core/core.module';
import { AppComponent } from '../app/app.component';
import { DraggableDirective } from '../app/teacher/graph-unit/d3/directives/draggable.directive';
import { LinkComponent } from '../app/teacher/graph-unit/d3/views/graph/link/link.component';
import { GraphComponent } from '../app/teacher/graph-unit/d3/views/graph/graph.component';
import { NodeComponent } from '../app/teacher/graph-unit/d3/views/graph/node/node.component';
import { UnitsNotRelatedComponent } from '../app/teacher/graph-unit/units-not-related/units-not-related.component';
import { ZoomableDirective } from '../app/teacher/graph-unit/d3/directives/zoomable.directive';
import { AppMaterialModule } from '../app/app-material.module';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        CdkTableModule,
        CoreModule,
        FlexLayoutModule,
        FormsModule,
        HttpModule,
        AppMaterialModule,
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
      providers: [
        {provide: APP_BASE_HREF, useValue : '/' },
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
