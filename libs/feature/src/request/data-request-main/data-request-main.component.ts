import { Component, OnInit } from '@angular/core';
import { UserService } from '@dpt/shared';

@Component({
  selector: 'dpt-data-request-main',
  templateUrl: './data-request-main.component.html',
  styleUrls: ['./data-request-main.component.scss'],
})
export class DataRequestMainComponent implements OnInit {
  canRequest = false;
  canRequestRole = ['1', '4', '6'];
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // 1	ผู้ดูแลระบบ
    // 2	ผู้ใช้งานระบบภายนอก
    // 3	ผู้ใช้งานระบบภายใน
    // 4	เลขานุการ
    // 5	เจ้าของข้อมูล
    // 6	เจ้าของข้อมูล (Admin)
    this.canRequest = !!this.canRequestRole.find(
      (a) => a === (this.userService.getUser()?.role.roleId ?? 0)
    );
  }
}
