import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'dpt-data-management-data-set-form',
  templateUrl: './data-management-data-set-form.component.html',
  styleUrls: ['./data-management-data-set-form.component.scss'],
})
export class DataManagementDataSetFormComponent implements OnInit {
  formGroup = new FormGroup({
    dataType: new FormControl('FILE'),
    dataName: new FormControl(),
    detail: new FormControl(),
    link: new FormControl(),
    category: new FormControl(),
    subCategory: new FormControl(),
    publishStatus: new FormControl(),
    publishSubStatus: new FormControl(),
    connectionString: new FormControl(),
    dataTable: new FormControl(),
    column: new FormControl(),
  });
  publishStatusList = [
    {
      label: 'Test Status',
      value: 'test value',
    },
    {
      label: 'Test Status',
      value: 'test value',
    },
  ];
  categoryList = [
    {
      label: 'Test category',
      value: 'test value',
    },
    {
      label: 'Test category',
      value: 'test value',
    },
  ];
  subCategoryList = [
    {
      label: 'Test category',
      value: 'test value',
    },
    {
      label: 'Test category',
      value: 'test value',
    },
  ];
  publishSubStatusList = [
    {
      label: 'Test Status',
      value: 'test value',
    },
    {
      label: 'Test Status',
      value: 'test value',
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
