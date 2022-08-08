import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeService } from '@dpt/shared';

@Component({
  selector: 'dpt-form-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './form-forgot-password.component.html',
  styleUrls: ['./form-forgot-password.component.scss'],
})
export class FormForgotPasswordComponent implements OnInit {
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
