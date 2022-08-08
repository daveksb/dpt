import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormForgotPasswordComponent } from '@dpt/form';
import { ThemeService } from '@dpt/shared';

@Component({
  selector: 'dpt-forgot-password',
  standalone: true,
  imports: [CommonModule, FormForgotPasswordComponent],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  customStyle = '';

  constructor(private themeService: ThemeService) {}

  selectTheme(evt: any) {
    this.themeService.setTheme(evt.target.value);
  }

  ngOnInit(): void {
    this.themeService.selectedTheme$.subscribe((res) => {
      this.customStyle = `background-color: var(--main-bg-${res})`;
    });
  }
}
