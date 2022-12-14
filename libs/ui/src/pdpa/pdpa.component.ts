import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TopNavComponent } from '../top-nav/top-nav.component';

@Component({
  selector: 'dpt-pdpa',
  standalone: true,
  imports: [CommonModule, RouterModule, TopNavComponent],
  templateUrl: './pdpa.component.html',
  styleUrls: ['./pdpa.component.scss'],
})
export class PdpaComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
