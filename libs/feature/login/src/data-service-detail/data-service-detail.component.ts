import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataServiceDialogComponent, TopNavComponent } from '@dpt/ui';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'dpt-data-service-detail',
  standalone: true,
  imports: [CommonModule, TopNavComponent, RouterModule],
  templateUrl: './data-service-detail.component.html',
  styleUrls: ['./data-service-detail.component.scss'],
})
export class DataServiceDetailComponent {
  constructor() {}

 /*  openDialog() {
    this.dialog.open(DataServiceDialogComponent, {
      height: '400px',
      width: '600px',
    });
  } */
}
