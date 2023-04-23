import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from '@dpt/shared';
import { CookieService } from 'ngx-cookie-service';
interface MapString {
  [index: string]: string[];
}
@Component({
  selector: 'dpt-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  @Input() isSecondary = false;
  isActive = true;
  currentUrl = '';
  hasAuth = false;
  isAdmin = false;
  pageList = [
    'landing',
    'data-service-list',
    'data-request',
    'publish',
    'data-management',
    'report',
    'admin',
  ];

  // 1	ผู้ดูแลระบบ
  // 2	ผู้ใช้งานระบบภายนอก
  // 3	ผู้ใช้งานระบบภายใน
  // 4	เลขานุการ
  // 5	เจ้าของข้อมูล
  // 6	เจ้าของข้อมูล (Admin)
  pagePermission: MapString = {
    '1': [
      'landing',
      'data-service-list',
      'data-request',
      'publish',
      'data-management',
      'report',
      'admin',
    ],
    '2': ['landing', 'data-service-list', 'data-request'],
    '3': ['landing', 'data-service-list', 'data-request'],
    '4': ['landing', 'data-service-list', 'data-request', 'publish'],
    '5': [
      'landing',
      'data-service-list',
      'data-request',
      'publish',
      'data-management',
    ],
    '6': [
      'landing',
      'data-service-list',
      'data-request',
      'publish',
      'data-management',
    ],
  };
  constructor(
    private route: Router,
    private cookieService: CookieService,
    private userService: UserService,
    private ref: ChangeDetectorRef
  ) {}
  hasArticlePermission() {
    const art = this.userService.getUser()?.roleArticle;
    return (
      art?.rolearcAddUpdate === 'T' ||
      art?.rolearcDelete === 'T' ||
      art?.rolearcId === '1'
    );
  }
  ngOnInit(): void {
    this.route.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.currentUrl = val.url;
        this.hasAuth = !!this.cookieService.get('dptToken');
        this.isAdmin = !!(this.userService.getUser()?.role?.roleId === '1');
      }
    });
    this.hasAuth = !!this.cookieService.get('dptToken');
  }
  isContainUrl(data: string) {
    return this.currentUrl.includes(data);
  }
  logout() {
    this.userService.clearUser();
  }
  hasPermission(page: string) {
    const roleId = this.userService.getUser()?.role?.roleId;
    if (roleId) {
      const permission = this.pagePermission[roleId];
      this.ref.markForCheck();
      return !!permission.some((a) => a === page) && this.hasAuth;
    } else {
      this.ref.markForCheck();
      return false;
    }
  }
  get canRequest() {
    return (
      this.userService.getUser()?.role.roleId === '5' ||
      this.userService.getUser()?.role.roleId === '6'
    );
  }
}
