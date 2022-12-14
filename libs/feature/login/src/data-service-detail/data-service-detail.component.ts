import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataServiceDialogComponent, TopNavComponent } from '@dpt/ui';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'dpt-data-service-detail',
  standalone: true,
  imports: [CommonModule, TopNavComponent, RouterModule, MatDialogModule],
  templateUrl: './data-service-detail.component.html',
  styleUrls: ['./data-service-detail.component.scss'],
})
export class DataServiceDetailComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(DataServiceDialogComponent, {
      width: '500px',
    });
  }
}
