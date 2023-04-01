import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'dpt-pdpa',
  templateUrl: './pdpa.component.html',
  styleUrls: ['./pdpa.component.scss'],
})
export class PdpaComponent {
  constructor(public dialogRef: MatDialogRef<any>) {}

  dismiss() {
    this.dialogRef.close();
  }
}
