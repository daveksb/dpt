import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormRegisterComponent } from '@dpt/form';
import { ThemeService } from '@dpt/shared';

@Component({
  selector: 'dpt-register',
  standalone: true,
  imports: [CommonModule, FormRegisterComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
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
