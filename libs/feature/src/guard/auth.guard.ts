import { Injectable } from '@angular/core';
import { CanActivate, Route, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private cookieService: CookieService, private route: Router) {}
  canActivate() {
    const hasToken = this.cookieService.get('dptToken');
    if (!hasToken) {
      this.route.navigate(['/login']);
    }
    return !!hasToken;
  }
}
