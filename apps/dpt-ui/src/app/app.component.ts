import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MainApiService, SharedStateService } from '@dpt/shared';
import { Department } from 'libs/shared/src/lib/share.model';

@Component({
  selector: 'dpt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'dpt-ui';
  hideList = ['/login', '/register', '/forgot-password', '/pdpa'];
  isSecondary = false;
  isActive = true;
  currentUrl = '';
  hasPadding = false;
  constructor(
    private route: Router,
    private apiService: MainApiService,
    private sharesService: SharedStateService
  ) {
    route.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        console.log(val.url);
        this.isSecondary = this.hideList.some((d) => val.url === d);
        this.currentUrl = val.url;
        this.hasPadding =
          this.hideList.some((d) => val.url === d) ||
          val.url.includes('landing') ||
          val.url === '/';
      }
    });
  }
  isContainUrl(data: string) {
    return this.currentUrl.includes(data);
  }
  ngOnInit(): void {
    this.apiService.getDepartment().subscribe((a) => {
      this.sharesService.setDepartment(a.Department as Department[]);
    });
  }
}
