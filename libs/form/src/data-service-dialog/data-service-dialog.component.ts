import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'dpt-data-service-dialog',
  templateUrl: './data-service-dialog.component.html',
  styleUrls: ['./data-service-dialog.component.scss'],
})
export class DataServiceDialogComponent implements OnInit {
  token = '';
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.token = data.tokenKey;
  }

  ngOnInit(): void {}
}
