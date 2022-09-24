import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '@dpt/shared';

@Component({
  selector: 'dpt-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
})
export class TopNavComponent implements OnInit {
  @Input() isSecondary = false;
  isActive = true;
  currentUrl = '';
  hasAuth = false;
  isAdmin = false;
  constructor(
    private route: Router,
    private cookieService: CookieService,
    private userService: UserService
  ) {
    route.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.currentUrl = val.url;
        this.hasAuth = !!this.cookieService.get('dptToken');
        this.isAdmin = !!(this.userService.getUser()?.role?.roleId === '1');
        console.log(this.userService.getUser());
      }
    });
  }
  ngOnInit(): void {}
  isContainUrl(data: string) {
    return this.currentUrl.includes(data);
  }
  logout() {
    this.userService.clearUser();
  }
}
