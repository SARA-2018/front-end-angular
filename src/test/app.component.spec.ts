import { TestBed, async } from '@angular/core/testing';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkTableModule } from '@angular/cdk/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { APP_BASE_HREF } from '@angular/common';
import { AppRoutingModule } from '../app/app-routing.module';
import { CoreModule } from '../app/core/core.module';
import { AppComponent } from '../app/app.component';
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
        AppRoutingModule.DIALOGS_COMPONENTS
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
