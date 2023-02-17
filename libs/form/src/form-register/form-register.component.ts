import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MainApiService } from '@dpt/shared';
import { RegisterRequest } from '@dpt/shared';
import { MatDialog } from '@angular/material/dialog';
import { DefaultDialogComponent } from '../default-dialog/default-dialog.component';
import * as md5 from 'md5';
import { SHA1 } from 'crypto-js';
const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const phoneRegex = /((\+66|0)(\d{1,2}\-?\d{3}\-?\d{3,4}))/gm;
export function SamePasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control?.parent?.get('password')?.value;
    return password !== control?.value ? { invalidPassword: true } : null;
  };
}
export function EmailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return !((control?.value ?? '') as string).match(emailRegex)
      ? { invalidEmail: true }
      : null;
  };
}
export function PhoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return !((control?.value ?? '') as string).match(phoneRegex)
      ? { invalidPhone: true }
      : null;
  };
}

@Component({
  selector: 'dpt-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.scss'],
})
export class FormRegisterComponent implements OnInit {
  formGroup = new FormGroup({
    departmentType: new FormControl('3', Validators.required),
    email: new FormControl(null, [Validators.required, EmailValidator()]),
    departmentCategory: new FormControl(null, Validators.required),
    departmentName: new FormControl(null),
    userNameTh: new FormControl(null, Validators.required),
    userNameEn: new FormControl(null, Validators.required),
    userLastNameTh: new FormControl(null, Validators.required),
    userLastNameEn: new FormControl(null, Validators.required),
    idNumber: new FormControl(null, [
      Validators.required,
      Validators.minLength(13),
      Validators.maxLength(13),
    ]),
    position: new FormControl(null, Validators.required),
    mobile: new FormControl(null, [Validators.required, PhoneValidator()]),
    userName: new FormControl(null, Validators.required),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
    ]),
    confirmPassword: new FormControl(null, [
      Validators.required,
      SamePasswordValidator(),
      Validators.minLength(8),
    ]),
  });
  checked = false;
  departmentList: any[] = [];
  constructor(
    private apiService: MainApiService,
    private dialog: MatDialog,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.apiService.getDepartment().subscribe((dep) => {
      this.departmentList = dep.Department;
    });
    this.formGroup.get('departmentType')?.valueChanges.subscribe((va) => {
      if (va === '3') {
        this.formGroup.get('departmentName')?.clearValidators();
        this.formGroup
          .get('departmentCategory')
          ?.addValidators(Validators.required);
        this.formGroup.get('departmentCategory')?.updateValueAndValidity();
        this.formGroup.get('departmentName')?.updateValueAndValidity();
        this.formGroup.updateValueAndValidity();
      } else {
        this.formGroup.get('departmentCategory')?.clearValidators();
        this.formGroup
          .get('departmentName')
          ?.addValidators(Validators.required);
        this.formGroup.get('departmentCategory')?.updateValueAndValidity();
        this.formGroup.get('departmentName')?.updateValueAndValidity();
        this.formGroup.updateValueAndValidity();
      }
    });
    this.formGroup.get('departmentCategory')?.updateValueAndValidity();
    this.formGroup.get('departmentName')?.updateValueAndValidity();
    this.formGroup.updateValueAndValidity();
  }
  onConfirm() {
    if (this.formGroup.valid) {
      this.apiService.register(this.mapForm()).subscribe({
        next: (res) => {
          if (res.returnCode === '00') {
            const ref = this.dialog.open(DefaultDialogComponent, {
              maxHeight: '800px',
              width: '500px',
              data: {
                status: 'ลงทะเบียนสำเร็จ',
                message: 'รอการอนุมัติจากเจ้าหน้าที่',
              },
            });
            ref.afterClosed().subscribe(() => {
              this.route.navigate(['landing']);
            });
          } else {
            this.dialog.open(DefaultDialogComponent, {
              maxHeight: '800px',
              width: '500px',
              data: {
                isError: true,
                status: 'ลงทะเบียนไม่สำเร็จ',
                message: res.returnMessage,
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
              message: er.returnMessage,
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
    const m = md5(form?.password ?? '');
    const sha = SHA1(m);
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
      pwd: sha.toString(),
      roleId: form.departmentType,
      pid: form.idNumber,
      tel: form.mobile,
    };
  }
}
