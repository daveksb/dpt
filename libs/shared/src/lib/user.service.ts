import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from './share.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user?: User;
  constructor(private cookieService: CookieService) {}
  getUser(): User | undefined {
    if (this.user) {
      return this.user;
    } else {
      const temp = this.cookieService.get('userSetting') ?? '';
      if (temp) {
        this.user = JSON.parse(temp);
      }
      return this.user;
    }
  }
  setUser(user?: User) {
    this.user = user;
    this.cookieService.set('userSetting', JSON.stringify(this.user));
  }
  clearUser() {
    this.user = undefined;
    this.cookieService.set('dptToken', '');
    this.cookieService.set('userSetting', '');
  }
  isUserInternal() {
    return (
      !this.user?.departmentExternal && !!this.user?.department.departmentId
    );
  }
}
