import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'dpt-admin-sao-form',
  templateUrl: './admin-sao-form.component.html',
  styleUrls: ['./admin-sao-form.component.scss'],
})
export class AdminSaoFormComponent implements OnInit {
  formGroup = new FormGroup({
    tokenId: new FormControl(),
    maxLimit: new FormControl(),
    timePeriod: new FormControl(),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>
  ) {
    this.formGroup.patchValue(data.adminSao);
  }

  ngOnInit(): void {}

  onDismiss() {
    this.dialogRef.close();
  }
  onConfirm() {
    this.data.onConfirm(this.formGroup.value);
    this.onDismiss();
  }
}
