import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dpt-data-request-main',
  templateUrl: './data-request-main.component.html',
  styleUrls: ['./data-request-main.component.scss'],
})
export class DataRequestMainComponent implements OnInit {
  navList: any[] = [
    {
      url: 'request-list',
      label: 'ชุดข้อมูล',
    },
    {
      url: 'data-set',
      label: 'ข้อมูลที่ร้องขอ',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
