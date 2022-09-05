import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dpt-data-management-main',
  templateUrl: './data-management-main.component.html',
  styleUrls: ['./data-management-main.component.scss'],
})
export class DataManagementMainComponent implements OnInit {
  navList: any[] = [
    {
      url: 'data-set',
      label: 'จัดการชุดข้อมูล',
    },
    {
      url: 'file',
      label: 'จัดการไฟล์',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
