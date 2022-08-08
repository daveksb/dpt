import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavComponent } from '@dpt/ui';
import { RouterModule } from '@angular/router';
import { ThemeService } from '@dpt/shared';

@Component({
  selector: 'dpt-data-service-request',
  standalone: true,
  imports: [CommonModule, TopNavComponent, RouterModule],
  templateUrl: './data-service-request.component.html',
  styleUrls: ['./data-service-request.component.scss'],
})
export class DataServiceRequestComponent implements OnInit {
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
