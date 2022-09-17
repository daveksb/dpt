import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainApiService, UserService } from '@dpt/shared';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Dialog } from '@angular/cdk/dialog';
import { DefaultDialogComponent } from '../default-dialog/default-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DateTime } from 'luxon';
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
    private cookieService: CookieService,
    private router: Router,
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}
  login() {
    const email = this.formGroup.get('email')?.value;
    const password = this.formGroup.get('password')?.value;
    if (this.formGroup.valid && email && password) {
      this.apiService.login(email, password).subscribe((res) => {
        console.log(res);
        if (res.tokenKey) {
          const today = DateTime.now();
          today.plus({ hour: 3 });
          this.cookieService.set('dptToken', res.tokenKey, 1);
          console.log(this.cookieService.get('dptToken'));
          this.userService.setUser(res);
          this.router.navigate(['/landing']);
        } else {
          this.dialog.open(DefaultDialogComponent, {
            maxHeight: '800px',
            width: '500px',
            data: {
              status: 'เข้าสู่ระบบไม่สำเร็จ',
              message: 'กรุณาตรวจสอบ Username และ Password อีกครั้ง',
            },
          });
        }
      });
    }
  }
}
