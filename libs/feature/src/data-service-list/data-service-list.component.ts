import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent, TopNavComponent } from '@dpt/ui';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'dpt-data-service-list',
  standalone: true,
  imports: [CommonModule, SideNavComponent, TopNavComponent, RouterModule],
  templateUrl: './data-service-list.component.html',
  styleUrls: ['./data-service-list.component.scss'],
})
export class DataServiceListComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
