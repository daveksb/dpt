import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MainApiService } from '@dpt/shared';
import { RegisterRequest } from 'libs/shared/src/lib/share.model';
import { MatDialog } from '@angular/material/dialog';
import { DefaultDialogComponent } from '../default-dialog/default-dialog.component';

export function SamePasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control?.parent?.get('password')?.value;
    console.log(password);
    console.log(control?.value);
    return password !== control?.value ? { invalidPassword: true } : null;
  };
}

@Component({
  selector: 'dpt-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.scss'],
})
export class FormRegisterComponent {
  formGroup = new FormGroup({
    departmentType: new FormControl('INSIDER', Validators.required),
    email: new FormControl(null, Validators.required),
    departmentCategory: new FormControl(null, Validators.required),
    departmentName: new FormControl(null),
    userNameTh: new FormControl(null, Validators.required),
    userNameEn: new FormControl(null, Validators.required),
    idNumber: new FormControl(null, Validators.required),
    position: new FormControl(null, Validators.required),
    mobile: new FormControl(null, Validators.required),
    userName: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    confirmPassword: new FormControl(null, [
      Validators.required,
      SamePasswordValidator(),
    ]),
  });

  departmentList: any[] = [];
  constructor(private apiService: MainApiService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.apiService.getDepartment().subscribe((dep) => {
      this.departmentList = dep.Department;
    });
    this.formGroup.get('departmentType')?.valueChanges.subscribe((va) => {
      if (va === 'OUTSIDER') {
        this.formGroup.get('departmentCategory')?.clearValidators();
        this.formGroup
          .get('departmentName')
          ?.addValidators(Validators.required);
        this.formGroup.updateValueAndValidity();
      } else {
        this.formGroup.get('departmentName')?.clearValidators();
        this.formGroup
          .get('departmentCategory')
          ?.addValidators(Validators.required);
        this.formGroup.updateValueAndValidity();
      }
    });
    this.formGroup.updateValueAndValidity();
  }
  onConfirm() {
    if (this.formGroup.valid) {
      this.apiService.register(this.formGroup.value).subscribe({
        next: (res) => {
          if (res.returnCode === '00') {
            this.dialog.open(DefaultDialogComponent, {
              maxHeight: '800px',
              width: '500px',
              data: {
                status: 'ลงทะเบียนสำเร็จ',
                message: 'ลงทะเบียนสำเร็จ',
              },
            });
          } else {
            this.dialog.open(DefaultDialogComponent, {
              maxHeight: '800px',
              width: '500px',
              data: {
                isError: true,
                status: 'ลงทะเบียนไม่สำเร็จ',
                message: 'กรุณาตรวจสอบข้อมูลอีกครั้ง',
              },
            });
          }
        },
        error: (er) => {
          this.dialog.open(DefaultDialogComponent, {
            maxHeight: '800px',
            width: '500px',
            data: {
              isError: true,
              status: 'ลงทะเบียนไม่สำเร็จ',
              message: 'กรุณาตรวจสอบข้อมูลอีกครั้ง',
            },
          });
        },
      });
    }
  }

  get isInsider() {
    return (
      (this.formGroup.get('departmentType')?.value
        ? String(this.formGroup.get('departmentType')?.value)
        : '') === 'INSIDER'
    );
  }
  mapForm(): RegisterRequest {
    const form = this.formGroup.value;
    return {
      depId: form.departmentType,
      depName: form.departmentName,
      email: form.email,
      ename: form.userNameEn,
      name: form.userNameTh,
      usr: form.userName,
      lname: '',
      position: form.position,
      pwd: form.password,
      roleId: '',
      pid: '',
      // pid:
    };
  }
}
