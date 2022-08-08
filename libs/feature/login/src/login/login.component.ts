import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormLoginComponent } from '@dpt/form';
import { ThemeService } from '@dpt/shared';

@Component({
  selector: 'dpt-login',
  standalone: true,
  imports: [CommonModule, FormLoginComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  customStyle = '';
  constructor(private themeService: ThemeService) {}

  selectTheme(evt: any) {
    this.themeService.setTheme(evt.target.value);
  }

  ngOnInit(): void {
    this.themeService.selectedTheme$.subscribe((res) => {
      this.customStyle = `background-color: var(--login-bg-${res})`;
    });
  }
}
