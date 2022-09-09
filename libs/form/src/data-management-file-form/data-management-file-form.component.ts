import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'dpt-data-management-file-form',
  templateUrl: './data-management-file-form.component.html',
  styleUrls: ['./data-management-file-form.component.scss'],
})
export class DataManagementFileFormComponent implements OnInit {
  formGroup = new FormGroup({
    dataName: new FormControl(),
    department: new FormControl(),
    detail: new FormControl(),
    dataType: new FormControl(),
    file: new FormControl(),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>
  ) {
    this.formGroup.patchValue(data);
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  onDismiss() {
    this.dialogRef.close();
  }
  onConfirm() {
    this.data.onConfirm(this.formGroup);
    this.onDismiss();
  }
  get isAPI() {
    return this.formGroup.get('dataType')?.value === 'API';
  }
  get isEdit() {
    return this.data.isEdit;
  }
}
