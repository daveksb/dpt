import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dpt-data-service-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-service-dialog.component.html',
  styleUrls: ['./data-service-dialog.component.scss'],
})
export class DataServiceDialogComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
