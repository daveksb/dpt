import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavComponent } from '@dpt/ui';

@Component({
  selector: 'dpt-landing',
  standalone: true,
  imports: [CommonModule, TopNavComponent],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
