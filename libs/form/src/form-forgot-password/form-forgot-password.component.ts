import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainApiService } from '@dpt/shared';

@Component({
  selector: 'dpt-form-forgot-password',
  templateUrl: './form-forgot-password.component.html',
  styleUrls: ['./form-forgot-password.component.scss'],
})
export class FormForgotPasswordComponent implements OnInit {
  formGroup = new FormGroup({
    email: new FormControl(null, Validators.required),
  });
  constructor(private apiService: MainApiService) {}

  ngOnInit(): void {}
  onConfirm() {
    const email = this.formGroup.get('email')?.value;
    if (this.formGroup.valid && email) {
      this.apiService.forgotPassword(email).subscribe((res) => {
        //
      });
    }
  }
}
