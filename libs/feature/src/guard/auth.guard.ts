import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private cookieService: CookieService) {}
  canActivate() {
    const hasToken = this.cookieService.get('dptToken');
    return !!hasToken;
  }
}
