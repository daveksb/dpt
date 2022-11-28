import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  DataReturn,
  Department,
  MainApiService,
  UserService,
} from '@dpt/shared';

@Component({
  selector: 'dpt-approve-department-form',
  templateUrl: './approve-department-form.component.html',
  styleUrls: ['./approve-department-form.component.scss'],
})
export class ApproveDepartmentFormComponent implements OnInit {
  formGroup = new FormGroup({
    department: new FormControl(),
    reason: new FormControl(),
    apiId: new FormControl(),
  });
  departments: Department[] = [];
  apiList: DataReturn[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    private mainApiService: MainApiService,
    private userService: UserService
  ) {
    this.formGroup.patchValue(data);
    this.departments = data.departments;
    this.mainApiService.getDataByDepartment(data.depId).subscribe((res) => {
      this.apiList = res.datareturn;
    });
  }

  ngOnInit(): void {}

  onDismiss() {
    this.dialogRef.close();
  }

  // onConfirm() {
  //   this.mainApiService
  //     .updateApprovalDepartment({
  //       apiId: this.formGroup.get('apiId')?.value,
  //       depId: this.formGroup.get('department')?.value,
  //       reason: this.formGroup.get('reason')?.value,
  //       userId: this.data.reqUserId,
  //       depUserId: this.data.userId,
  //       approve: this.data.approve,
  //       reqId: this.data.reqId,
  //       countdatetemp: '365',
  //       countdate: '365',
  //     })
  //     .subscribe({
  //       next: (res) => {
  //         if (res.returnCode === '00') {
  //           this.onDismiss();
  //         } else {
  //           alert(res.returnMessage);
  //         }
  //       },
  //       error: () => {
  //         this.onDismiss();
  //       },
  //     });
  // }
  onConfirm() {
    if (this.data.roleId === '4') {
      this.mainApiService
        .updateApproval({
          depId: this.formGroup.get('department')?.value,
          reason: this.formGroup.get('reason')?.value,
          secUserId: this.data.userId,
          approve: this.data.approve,
          reqId: this.data.reqId,
          reqUserId: this.data.reqUserId,
        })
        .subscribe({
          next: (res) => {
            if (res.returnCode === '00') {
              this.onDismiss();
            } else {
              alert(res.returnMessage);
            }
          },
          error: () => {
            this.onDismiss();
          },
        });
    } else if (this.data.roleId === '5' || this.data.roleId === '6') {
      this.mainApiService
        .updateApprovalDepartment({
          apiId: this.formGroup.get('apiId')?.value,
          depId: this.formGroup.get('department')?.value,
          reason: this.formGroup.get('reason')?.value,
          userId: this.data.reqUserId,
          depUserId: this.data.userId,
          approve: this.data.approve,
          reqId: this.data.reqId,
          countdatetemp: '365',
          countdate: '365',
        })
        .subscribe({
          next: (res) => {
            if (res.returnCode === '00' || res.returnCode === '01') {
              this.onDismiss();
            } else {
              alert(res.returnMessage);
            }
          },
          error: () => {
            this.onDismiss();
          },
        });
    }
  }
}
