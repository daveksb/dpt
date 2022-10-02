import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { UserService } from '@dpt/shared';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private userService: UserService, private route: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const permission = route.data['permission'] as Array<string>;
    const hasRole = this.userService.getUser()?.role.roleId;
    const access: any = this.userService.getUser()?.role.accessControl;
    const hasAccess = permission.some((p) => access[p] === 'T');
    if (!hasRole || !hasAccess) {
      this.route.navigate(['landing']);
    }
    return !!hasRole && hasAccess;
  }
}
