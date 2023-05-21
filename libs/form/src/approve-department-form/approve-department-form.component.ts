import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {
  DataReturn,
  Department,
  MainApiService,
  UserService,
} from '@dpt/shared';
import { DefaultDialogComponent } from '../default-dialog/default-dialog.component';

@Component({
  selector: 'dpt-approve-department-form',
  templateUrl: './approve-department-form.component.html',
  styleUrls: ['./approve-department-form.component.scss'],
})
export class ApproveDepartmentFormComponent implements OnInit {
  formGroup = new FormGroup({
    department: new FormControl(null, Validators.required),
    reason: new FormControl(
      'ไม่อนุมัติคำร้องขอเนื่องจาก ....{{เหตุผลในการไม่อนุมัติ}}....'
    ),
    apiId: new FormControl(null),
  });
  departments: Department[] = [];
  apiList: DataReturn[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    private mainApiService: MainApiService,
    private userService: UserService,
    private dialog: MatDialog
  ) {
    this.formGroup.patchValue(data);
    this.departments = data.departments;
    this.mainApiService.getDataByDepartment(data.depId).subscribe((res) => {
      this.apiList = res.datareturn;
    });
    if (this.data.roleId === '4') {
      this.formGroup.get('department')?.setValidators(null);
    }
  }

  ngOnInit(): void {}

  onDismiss() {
    this.dialogRef.close();
  }

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
              this.dialog.open(DefaultDialogComponent, {
                maxHeight: '800px',
                width: '500px',
                data: {
                  status: 'ดำเนินการสำเร็จ',
                },
              });
              this.onDismiss();
            } else {
              this.dialog.closeAll();
              this.dialog.open(DefaultDialogComponent, {
                maxHeight: '800px',
                width: '500px',
                data: {
                  isError: true,
                  status: 'ดำเนินการไม่สำเร็จ',
                },
              });
            }
          },
          error: () => {
            this.onDismiss();
            this.dialog.closeAll();
            this.dialog.open(DefaultDialogComponent, {
              maxHeight: '800px',
              width: '500px',
              data: {
                isError: true,
                status: 'ดำเนินการไม่สำเร็จ',
              },
            });
          },
        });
    }
  }
}
