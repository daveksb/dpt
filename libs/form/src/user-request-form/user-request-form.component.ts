import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminUserList, Role } from '@dpt/shared';

@Component({
  selector: 'dpt-user-request-form',
  templateUrl: './user-request-form.component.html',
  styleUrls: ['./user-request-form.component.scss'],
})
export class UserRequestFormComponent implements OnInit {
  userDetail?: AdminUserList;
  roleList: Role[] = [];
  roleArticleList = [
    {
      label: 'ผู้ดูแลบทความข่าวสาร',
      value: '1',
    },
    {
      label: 'ไม่มี',
      value: '0',
    },
  ];
  form = new FormGroup({
    roleId: new FormControl(null, Validators.required),
    roleArc: new FormControl(null, Validators.required),
    status: new FormControl(null, Validators.required),
    userId: new FormControl(null, Validators.required),
  });
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>
  ) {
    this.userDetail = data.userDetail;
    this.roleList = data.roleList ?? [];
    this.form
      .get('roleId')
      ?.setValue(
        data.roleList
          .find((res: Role) => res.roleName === data.userDetail?.roleName)
          ?.roleId?.toString() ?? ''
      );
    if (data?.userDetail?.approve !== 'Y') {
      this.form.get('roleId')?.disable();
    }
    this.form.get('status')?.setValue(data.userDetail?.approve ?? 'N');
    this.form.get('userId')?.setValue(data.userId ?? '');
    this.form.get('roleArc')?.setValue(data.roleArc ?? '');
  }

  ngOnInit(): void {}

  onDismiss() {
    this.dialogRef.close();
  }
  onConfirm() {
    this.data.onConfirm(this.form.getRawValue());
  }
}
