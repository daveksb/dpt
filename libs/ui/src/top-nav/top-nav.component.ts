import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Role, UserService } from '@dpt/shared';
interface MapString {
  [index: string]: string[];
}
@Component({
  selector: 'dpt-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
})
export class TopNavComponent implements OnInit {
  @Input() isSecondary = false;

  @Output() clickToggle = new EventEmitter();
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
  userName = '';
  isShowRegister = false;
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
        this.isShowRegister = val.url === '/login';
      }
    });
    this.userService.user$.subscribe((res) => {
      if (res?.name && res?.lname) {
        this.userName = `${res?.name ?? ''} ${res?.lname ?? ''}`;
      }
    });
    console.log(this.userService.getUser());
  }
  ngOnInit(): void {}
  isContainUrl(data: string) {
    return this.currentUrl.includes(data);
  }
  logout() {
    this.userService.clearUser();
  }
  hasArticlePermission() {
    const art = this.userService.getUser()?.roleArticle;
    return (
      art?.rolearcAddUpdate === 'T' ||
      art?.rolearcDelete === 'T' ||
      art?.rolearcId === '1'
    );
  }
  hasPermission(page: string) {
    const roleId = this.userService.getUser()?.role?.roleId;
    if (roleId) {
      const permission = this.pagePermission[roleId];
      return !!permission.some((a) => a === page) && this.hasAuth;
    } else {
      return false;
    }
  }
  get canRequest() {
    return (
      this.userService.getUser()?.role.roleId === '5' ||
      this.userService.getUser()?.role.roleId === '6'
    );
  }
  onClickToggle() {
    this.clickToggle.emit(true);
  }
}
