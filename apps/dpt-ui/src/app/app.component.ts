import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'dpt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'dpt-ui';
  hideList = ['login', 'register', 'forgot-password', 'pdpa'];
  isSecondary = true;
  isActive = true;
  currentUrl = '';
  constructor(private route: Router) {
    route.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.isSecondary = this.hideList.some((d) => val.url.includes(d));
        this.currentUrl = val.url;
      }
    });
  }
  isContainUrl(data: string) {
    return this.currentUrl.includes(data);
  }
}
