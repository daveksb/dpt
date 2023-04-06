import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DefaultDialogComponent } from '@dpt/form';
import { AdminRoleListResponse, MainApiService, Role } from '@dpt/shared';

@Component({
  selector: 'dpt-admin-role',
  templateUrl: './admin-role.component.html',
  styleUrls: ['./admin-role.component.scss'],
})
export class AdminRoleComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  isEdit = false;
  displayedColumns: string[] = [
    'roleName',
    'accReq',
    'accAdd',
    'accEdit',
    'accApproveApi',
    'accSetApi',
    'accSetAccess',
    'accManageUser',
    'accApproveService',
    'action',
  ];

  dataSource = new MatTableDataSource();
  constructor(private apiService: MainApiService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.apiService.getAdminRoleList().subscribe((res) => {
      if (res) {
        this.dataSource = new MatTableDataSource<any>(
          res.Role.map((role) => {
            return {
              ...role,
              isEdit: false,
            };
          })
        );
      }
    });
  }
  onEdit(row: any) {
    if (row.isEdit) {
      const role = {
        accId: row.accessControl.accId,
        accReq: row.accessControl.accReq,
        accAdd: row.accessControl.accAdd,
        accEdit: row.accessControl.accEdit,
        accApproveApi: row.accessControl.accApproveApi,
        accSetApi: row.accessControl.accSetApi,
        accSetAccess: row.accessControl.accSetAccess,
        accManageUser: row.accessControl.accManageUser,
        accApproveService: row.accessControl.accApproveService,
      };
      this.apiService.editRoleAccess(role).subscribe({
        next: (res) => {
          if (res.returnCode === '00') {
            this.dialog.open(DefaultDialogComponent, {
              maxHeight: '800px',
              width: '500px',
              data: {
                status: 'ดำเนินการสำเร็จ',
              },
            });
            this.isEdit = !this.isEdit;
          } else {
            this.dialog.open(DefaultDialogComponent, {
              maxHeight: '800px',
              width: '500px',
              data: {
                isError: true,
                status: 'ดำเนินการไม่สำเร็จ',
              },
            });
          }
        },
        error: () => {
          this.dialog.open(DefaultDialogComponent, {
            maxHeight: '800px',
            width: '500px',
            data: {
              isError: true,
              status: 'ดำเนินการไม่สำเร็จ',
            },
          });
        },
      });
    }
    row.isEdit = !row.isEdit;
  }
}
