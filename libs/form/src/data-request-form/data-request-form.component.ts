import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'dpt-data-request-form',
  templateUrl: './data-request-form.component.html',
  styleUrls: ['./data-request-form.component.scss'],
})
export class DataRequestFormComponent implements OnInit {
  formGroup = new FormGroup({
    departmentType: new FormControl(),
    department: new FormControl(),
    requestFullName: new FormControl(),
    category: new FormControl(),
    dataName: new FormControl(),
    detail: new FormControl(),
    file: new FormControl(),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>
  ) {
    this.formGroup.patchValue(data);
    this.formGroup.disable();
  }

  ngOnInit(): void {}

  onDismiss() {
    this.dialogRef.close();
  }
}
