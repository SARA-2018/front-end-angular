import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  templateUrl: 'formation-dialog.component.html'
})
export class FormationDialogComponent {
  constructor(public dialogRef: MatDialogRef<FormationDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  close(data: any) {
    this.dialogRef.close(data);
  }
}
