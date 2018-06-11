import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpService } from './http.service';
import { NgModule } from '@angular/core';

import {
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSortModule,
    MatTableModule,
    MatCardModule
} from '@angular/material';
import { CancelYesDialogComponent } from './cancel-yes-dialog.component';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        MatIconModule,
        MatInputModule,
        MatSortModule,
        MatTableModule,
    ],
    declarations: [CancelYesDialogComponent],
    exports: [CancelYesDialogComponent],
    entryComponents: [CancelYesDialogComponent],
    providers: [
        HttpService,
    ]
})
export class CoreModule { }
