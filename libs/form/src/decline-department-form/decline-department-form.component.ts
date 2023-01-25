import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MainApiService, UserService } from '@dpt/shared';
import { DefaultDialogComponent } from '../default-dialog/default-dialog.component';

@Component({
  selector: 'dpt-decline-department-form',
  templateUrl: './decline-department-form.component.html',
  styleUrls: ['./decline-department-form.component.scss'],
})
export class DeclineDepartmentFormComponent implements OnInit {
  formGroup = new FormGroup({
    reason: new FormControl(
      'ไม่อนุมัติคำร้องขอเนื่องจาก ....{{เหตุผลในการไม่อนุมัติ}}....'
    ),
  });
  userName = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    private mainApiService: MainApiService,
    private userService: UserService,
    private dialog: MatDialog
  ) {
    this.formGroup.patchValue(data);
    this.userName = data.name;
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
    this.mainApiService
      .updateApprovalDepartmentPrivate({
        tokenId: this.data.tokenId,
        depUserId: this.data.depUserId,
        approve: 'N',
        reason: this.formGroup.get('reason')?.value,
      })
      .subscribe({
        next: (res) => {
          if (res.returnCode === '00' || res.returnCode === '01') {
            this.dialogRef.close();
            this.dialog.open(DefaultDialogComponent, {
              maxHeight: '800px',
              width: '500px',
              data: {
                status: 'ดำเนินการสำเร็จ',
              },
            });
          } else {
            this.dialogRef.close();
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
          this.dialogRef.close();
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
