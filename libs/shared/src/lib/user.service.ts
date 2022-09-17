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
      this.user = JSON.parse(this.cookieService.get('userSetting'));
      return this.user;
    }
  }
  setUser(user: User) {
    this.user = user;
    this.cookieService.set('userSetting', JSON.stringify(this.user));
  }
}
