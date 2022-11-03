import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MainApiService } from '@dpt/shared';

@Component({
  selector: 'dpt-data-service-dialog',
  templateUrl: './data-service-dialog.component.html',
  styleUrls: ['./data-service-dialog.component.scss'],
})
export class DataServiceDialogComponent implements OnInit {
  token = '';
  constructor(
    private apiService: MainApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    const body = {
      userId: this.data.userId,
      apiId: this.data.apiId,
      countdatetemp: '365',
      countdate: '365',
      zone: 'PB',
    };
    this.apiService.getTokenPublic(body).subscribe((res) => {
      if (res.returnCode === '00' || res.returnCode === '01') {
        this.token = res.tokenKey;
      }
      if (res.returnCode === '98') {
        this.token = res.returnMessage;
      }
    });
  }
}
