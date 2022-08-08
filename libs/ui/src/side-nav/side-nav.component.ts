import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '@dpt/shared';

@Component({
  selector: 'dpt-side-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  customStyle = '';
  constructor(private themeService: ThemeService) {}

  selectTheme(evt: any) {
    this.themeService.setTheme(evt.target.value);
  }

  ngOnInit(): void {
    this.themeService.selectedTheme$.subscribe((res) => {
      this.customStyle = `background-color: var(--side-nav-${res})`;
    });
  }

}
