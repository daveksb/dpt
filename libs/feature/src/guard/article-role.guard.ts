import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '@dpt/shared';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ArticleRoleGuard implements CanActivate {
  constructor(private userService: UserService, private route: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return (
      this.userService.getUser()?.roleArticle.rolearcAddUpdate === 'T' ||
      this.userService.getUser()?.roleArticle.rolearcDelete === 'T'
    );
  }
}
