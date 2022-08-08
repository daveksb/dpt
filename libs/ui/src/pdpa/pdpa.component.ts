import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TopNavComponent } from '../top-nav/top-nav.component';
import { ThemeService } from '@dpt/shared';

@Component({
  selector: 'dpt-pdpa',
  standalone: true,
  imports: [CommonModule, RouterModule, TopNavComponent],
  templateUrl: './pdpa.component.html',
  styleUrls: ['./pdpa.component.scss'],
})
export class PdpaComponent implements OnInit {
  customStyle = '';

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.selectedTheme$.subscribe((res) => {
      console.log('theme = ', res);
      this.customStyle = `background-color: var(--background-${res})`;
    });
  }
}
