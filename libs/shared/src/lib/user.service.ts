import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from './share.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user?: User;
  user$ = new BehaviorSubject<User | undefined>(undefined);
  constructor(private cookieService: CookieService) {
    const temp = this.cookieService.get('userSetting') ?? '';
    if (temp) {
      this.user = JSON.parse(temp);
      this.user$.next(this.user);
    }
  }
  getUser(): User | undefined {
    if (this.user) {
      return this.user;
    } else {
      const temp = this.cookieService.get('userSetting') ?? '';
      if (temp) {
        this.user = JSON.parse(temp);
        this.user$.next(this.user);
      }
      return this.user;
    }
  }
  setUser(user?: User) {
    this.user = user;
    this.user$.next(user);
    this.cookieService.set('userSetting', JSON.stringify(this.user));
  }
  clearUser() {
    this.user = undefined;
    this.user$.next(this.user);
    this.cookieService.set('dptToken', '');
    this.cookieService.set('userSetting', '');
  }
  isUserInternal() {
    return (
      !this.user?.departmentExternal && !!this.user?.department.departmentId
    );
  }
}
