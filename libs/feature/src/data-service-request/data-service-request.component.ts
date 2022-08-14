import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavComponent } from '@dpt/ui';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'dpt-data-service-request',
  standalone: true,
  imports: [CommonModule, TopNavComponent, RouterModule],
  templateUrl: './data-service-request.component.html',
  styleUrls: ['./data-service-request.component.scss'],
})
export class DataServiceRequestComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
