import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class TokenHandleInterceptor implements HttpInterceptor {
  private bypassUrl: string[] = ['ksp/dptlogin', 'dptrequest/selectcategory'];
  constructor(private cookieService: CookieService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.cookieService.get('dptToken');

    if (this.bypassUrl.some((a) => request.url.includes(a))) {
      return next.handle(request);
    }

    if (request.method === 'GET') {
      const newRequest = request.clone({
        url: request.url + `&tokenkey=${token}`,
      });

      return next.handle(newRequest);
    }

    if (request.method === 'POST') {
      request = request.clone({
        body: { ...request.body, tokenkey: token },
      });

      return next.handle(request);
    }

    return next.handle(request);
  }
}
