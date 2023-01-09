import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'dpt-admin-data-set-form',
  templateUrl: './admin-data-set-form.component.html',
  styleUrls: ['./admin-data-set-form.component.scss'],
})
export class AdminDataSetFormComponent implements OnInit {
  formGroup = new FormGroup({
    status: new FormControl(),
    countdatetemp: new FormControl(),
    countdate: new FormControl(),
    tokenId: new FormControl(),
  });
  statusList = [
    {
      label: 'เปิด',
      value: 'Y',
    },
    {
      label: 'ปิด',
      value: 'N',
    },
  ];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>
  ) {
    this.formGroup.patchValue(data);
  }

  ngOnInit(): void {}

  onDismiss() {
    this.dialogRef.close();
  }
  onConfirm() {
    this.data.onConfirm(this.formGroup.value);
    this.onDismiss();
  }
  get isEdit() {
    return this.data.isEdit;
  }
}
