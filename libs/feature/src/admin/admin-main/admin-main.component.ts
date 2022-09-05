import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dpt-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.scss'],
})
export class AdminMainComponent implements OnInit {
  navList: any[] = [
    {
      url: 'user',
      label: 'ผู้ใช้งาน',
    },
    {
      url: 'role',
      label: 'สิทธ์เข้าใช้งาน',
    },
    {
      url: 'log',
      label: 'ข้อมูลการจัดเก็บ',
    },
    {
      url: 'data-set',
      label: 'ชุดข้อมูล',
    },
    {
      url: 'department',
      label: 'จัดการหน่วยงาน',
    },
    {
      url: 'page-setting',
      label: 'จัดการหน้าหลัก',
    },
    {
      url: 'soa',
      label: 'Open Enterprise SOA',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
