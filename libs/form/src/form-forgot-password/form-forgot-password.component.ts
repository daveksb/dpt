import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MainApiService } from '@dpt/shared';
import { environment } from 'apps/dpt-ui/src/environments/environment';
import { DefaultDialogComponent } from '../default-dialog/default-dialog.component';
const emailRegex = environment.emailValidator;
function EmailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return !((control?.value ?? '') as string).match(emailRegex)
      ? { invalidEmail: true }
      : null;
  };
}
@Component({
  selector: 'dpt-form-forgot-password',
  templateUrl: './form-forgot-password.component.html',
  styleUrls: ['./form-forgot-password.component.scss'],
})
export class FormForgotPasswordComponent implements OnInit {
  formGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, EmailValidator()]),
  });
  constructor(private apiService: MainApiService, private dialog: MatDialog) {}

  ngOnInit(): void {}
  onConfirm() {
    const email = this.formGroup.get('email')?.value;
    if (this.formGroup.valid && email) {
      this.apiService.forgotPassword({ email }).subscribe({
        next: (res) => {
          if (res.returnCode === '00') {
            this.dialog.open(DefaultDialogComponent, {
              maxHeight: '800px',
              width: '500px',
              data: {
                status: 'ดำเนินการสำเร็จ',
                message: `ระบบได้ดำเนินการส่งลิงค์สำหรับเปลี่ยนรหัสผ่านไปที่อีเมล ${
                  this.formGroup.get('email')?.value
                } แล้ว`,
              },
            });
          } else {
            this.dialog.open(DefaultDialogComponent, {
              maxHeight: '800px',
              width: '500px',
              data: {
                isError: true,
                status: 'ดำเนินการไม่สำเร็จ',
                message: res.returnMessage,
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
}
