import { CanActivate } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export class AuthGuard implements CanActivate {
  constructor(private cookieService: CookieService) {}
  canActivate() {
    const hasToken = this.cookieService.get('dptToken');
    return !!hasToken;
  }
}
