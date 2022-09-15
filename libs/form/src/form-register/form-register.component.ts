import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MainApiService } from '@dpt/shared';

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
    departmentName: new FormControl(null, Validators.required),
    userNameTh: new FormControl(null, Validators.required),
    userNameEn: new FormControl(null, Validators.required),
    idNumber: new FormControl(null, Validators.required),
    position: new FormControl(null, Validators.required),
    mobile: new FormControl(null, Validators.required),
    userName: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    confirmPassword: new FormControl(null, Validators.required),
  });

  categoryList = [
    {
      label: 'Test category',
      value: 'test value',
    },
    {
      label: 'Test category',
      value: 'test value',
    },
  ];
  constructor(private apiService: MainApiService) {}

  ngOnInit(): void {
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
  }
  onConfirm() {
    if (this.formGroup.valid) {
      this.apiService.register(this.formGroup.value).subscribe((res) => {
        //
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
}
