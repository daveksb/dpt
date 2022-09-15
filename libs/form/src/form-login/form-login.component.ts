import { Component, OnInit } from '@angular/core';
import { CommonModule, formatPercent } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainApiService } from '@dpt/shared';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'dpt-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss'],
})
export class FormLoginComponent implements OnInit {
  formGroup = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });
  constructor(
    private apiService: MainApiService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {}
  login() {
    const email = this.formGroup.get('email')?.value;
    const password = this.formGroup.get('password')?.value;
    if (this.formGroup.valid && email && password) {
      this.apiService.login(email, password).subscribe((res) => {
        this.cookieService.set('dptUserToken', res.tokenKey);
      });
    }
  }
}
