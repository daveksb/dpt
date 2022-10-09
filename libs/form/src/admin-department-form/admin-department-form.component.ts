import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'dpt-admin-department-form',
  templateUrl: './admin-department-form.component.html',
  styleUrls: ['./admin-department-form.component.scss'],
})
export class AdminDepartmentFormComponent implements OnInit {
  formGroup = new FormGroup({
    departmentId: new FormControl(),
    departmentName: new FormControl(),
    departmentMember: new FormControl(),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>
  ) {
    this.formGroup.patchValue(data.adminDepartment);
  }

  ngOnInit(): void {}

  onDismiss() {
    this.dialogRef.close();
  }
  onConfirm() {
    this.data.onConfirm(this.formGroup);
    this.onDismiss();
  }
  get isEdit() {
    return this.data.isEdit;
  }
}
