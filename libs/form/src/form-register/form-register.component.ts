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
    departmentType: new FormControl('3', Validators.required),
    email: new FormControl(null, Validators.required),
    departmentCategory: new FormControl(null, Validators.required),
    departmentName: new FormControl(null),
    userNameTh: new FormControl(null, Validators.required),
    userNameEn: new FormControl(null, Validators.required),
    userLastNameTh: new FormControl(null, Validators.required),
    userLastNameEn: new FormControl(null, Validators.required),
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
      console.log(va);
      if (va === '3') {
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
      this.apiService.register(this.mapForm()).subscribe({
        next: (res) => {
          if (res.returnCode === '00') {
            this.dialog.open(DefaultDialogComponent, {
              maxHeight: '800px',
              width: '500px',
              data: {
                status: 'ลงทะเบียนสำเร็จ',
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
        : '') === '3'
    );
  }
  mapForm(): RegisterRequest {
    const form = this.formGroup.value;
    return {
      depId:
        String(form.departmentType) === '2' ? '0' : form.departmentCategory,
      depName: String(form.departmentType) === '2' ? form.departmentName : null,
      email: form.email,
      name_en: form.userNameEn,
      lname_en: form.userLastNameEn,
      name: form.userNameTh,
      usr: form.userName,
      lname: form.userLastNameTh,
      position: form.position,
      pwd: form.password,
      roleId: form.departmentType,
      pid: form.idNumber,
      tel: form.mobile,
    };
  }
}
