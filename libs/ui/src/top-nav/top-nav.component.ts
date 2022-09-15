import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';

@Component({
  selector: 'dpt-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
})
export class TopNavComponent implements OnInit {
  @Input() isSecondary = true;
  isActive = true;
  currentUrl = '';
  constructor(private route: Router) {
    route.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.currentUrl = val.url;
      }
    });
  }
  ngOnInit(): void {}
  isContainUrl(data: string) {
    return this.currentUrl.includes(data);
  }
}
