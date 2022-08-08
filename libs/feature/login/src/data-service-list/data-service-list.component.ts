import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent, TopNavComponent } from '@dpt/ui';
import { RouterModule } from '@angular/router';
import { ThemeService } from '@dpt/shared';

@Component({
  selector: 'dpt-data-service-list',
  standalone: true,
  imports: [CommonModule, SideNavComponent, TopNavComponent, RouterModule],
  templateUrl: './data-service-list.component.html',
  styleUrls: ['./data-service-list.component.scss'],
})
export class DataServiceListComponent implements OnInit {
  customStyle = '';
  customStyle2 = '';
  constructor(private themeService: ThemeService) {}

  selectTheme(evt: any) {
    this.themeService.setTheme(evt.target.value);
  }

  ngOnInit(): void {
    this.themeService.selectedTheme$.subscribe((res) => {
      this.customStyle = `background-color: var(--main-bg-${res})`;
      this.customStyle2 = `background-color: var(--form-header-${res})`;

    });
  }
}
