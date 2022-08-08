import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'dpt-data-service-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './data-service-dialog.component.html',
  styleUrls: ['./data-service-dialog.component.scss'],
})
export class DataServiceDialogComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
