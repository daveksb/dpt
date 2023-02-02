import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MainApiService, UserService } from '@dpt/shared';
import * as md5 from 'md5';
import { SHA1 } from 'crypto-js';
import { DefaultDialogComponent } from '../default-dialog/default-dialog.component';

function SamePasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control?.parent?.get('password')?.value;
    return password !== control?.value ? { invalidPassword: true } : null;
  };
}
@Component({
  selector: 'dpt-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  formGroup = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, [Validators.minLength(8)]),
    confirmPassword: new FormControl(null, [
      SamePasswordValidator(),
      Validators.minLength(8),
    ]),
  });
  constructor(
    private apiService: MainApiService,
    private dialog: MatDialog,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (!this.formGroup.valid) {
      return;
    }
    const m = md5(this.formGroup.get('password')?.value ?? '');
    const sha = SHA1(m);
    this.apiService
      .editUserInfo({
        userid: this.userService.getUser()?.userId,
        email: this.formGroup.get('email')?.value,
        password: sha.toString(),
      })
      .subscribe({
        next: (res) => {
          if (res.returnCode === '00') {
            this.dialog.open(DefaultDialogComponent, {
              maxHeight: '800px',
              width: '500px',
              data: {
                status: 'ดำเนินการสำเร็จ',
              },
            });
          } else {
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
