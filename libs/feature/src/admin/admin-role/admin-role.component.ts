import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MainApiService } from '@dpt/shared';
import { Role } from 'libs/shared/src/lib/share.model';

@Component({
  selector: 'dpt-admin-role',
  templateUrl: './admin-role.component.html',
  styleUrls: ['./admin-role.component.scss'],
})
export class AdminRoleComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'roleName',
    'accDepartment',
    'accReq',
    'accAdd',
    'accEdit',
    'accApproveApi',
    'accSetApi',
    'accSetAccess',
    'accManageUser',
    'accApproveService',
  ];

  dataSource = new MatTableDataSource();
  constructor(private apiService: MainApiService) {}
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.apiService.getAdminRoleList().subscribe((res) => {
      if (res) {
        this.dataSource = new MatTableDataSource<any>(res.Role);
      }
    });
  }
}
