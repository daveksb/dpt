import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
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
  isPdpa = false;
  isOpen = false;
  @ViewChild('nav') nav!: ElementRef<HTMLDivElement>;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isOpen = this.nav?.nativeElement?.clientWidth <= 1080;
  }
  constructor(
    private route: Router,
    private apiService: MainApiService,
    private sharesService: SharedStateService
  ) {
    route.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.isSecondary = this.hideList.some((d) => val.url === d);
        this.currentUrl = val.url;
        this.hasPadding =
          this.hideList.some((d) => val.url === d) ||
          val.url.includes('landing') ||
          val.url === '/';
        this.isPdpa = val.url === '/pdpa';
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
  onClickToggle() {
    if (this.nav?.nativeElement?.clientWidth <= 1080) {
      this.isOpen = !this.isOpen;
    }
  }
}
