import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeService } from '@dpt/shared';

@Component({
  selector: 'dpt-form-login',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss'],
})
export class FormLoginComponent implements OnInit {
  customStyle = '';
  constructor(private themeService: ThemeService) {}

  selectTheme(evt: any) {
    this.themeService.setTheme(evt.target.value);
  }

  ngOnInit(): void {
    this.themeService.selectedTheme$.subscribe((res) => {
      this.customStyle = `background-color: var(--form-header-${res})`;
    });
  }
}
