import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DefaultDialogComponent } from '@dpt/form';
import { MainApiService, UserService } from '@dpt/shared';
import { UserRequestFormComponent } from 'libs/form/src/user-request-form/user-request-form.component';
import {
  AdminUserList,
  DefaultResponse,
  Role,
} from 'libs/shared/src/lib/share.model';

@Component({
  selector: 'dpt-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss'],
})
export class AdminUserComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'order',
    'fullName',
    'email',
    'userName',
    'roleName',
    'statusAction',
    'createDate',
    'action',
  ];
  roleList: Role[] = [];
  dataSource = new MatTableDataSource();
  constructor(
    private dialog: MatDialog,
    private apiService: MainApiService,
    private userService: UserService
  ) {}
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.refresh();
    this.apiService.getAdminRoleList().subscribe((res) => {
      if (res.Role) {
        this.roleList = res.Role;
      }
    });
  }
  refresh() {
    this.apiService.getAdminUserList().subscribe((res) => {
      if (res.datareturn) {
        this.dataSource.data = res.datareturn;
      }
    });
  }
  sortChange(sortState: Sort | any) {}
  onApprove(row: AdminUserList) {
    const roleId = this.roleList.find(
      (res) => res.roleName === row.roleName
    )?.roleId;
    if (roleId) {
      this.onConfirm({
        roleId,
        userId: row.userId,
        status: 'Y',
      });
    }
  }
  onCancel(row: AdminUserList) {
    const roleId = this.roleList.find(
      (res) => res.roleName === row.roleName
    )?.roleId;
    if (roleId) {
      this.onConfirm({
        roleId,
        userId: row.userId,
        status: 'N',
      });
    }
  }
  onView(row: AdminUserList) {
    const data = {
      userDetail: row,
      roleList: this.roleList,
      userId: row.userId,
      roleArc: row.roleArc,
      onConfirm: this.onConfirm.bind(this),
    };
    const dialogRef = this.dialog.open(UserRequestFormComponent, {
      data,
      maxHeight: '800px',
    });
  }
  onDelete(id: string) {
    this.apiService
      .deleteUser({
        userId: id,
      })
      .subscribe({
        next: (res) => {
          if (res.returnCode === '00') {
            this.refresh();
            this.dialog.closeAll();
            this.dialog.open(DefaultDialogComponent, {
              maxHeight: '800px',
              width: '500px',
              data: {
                status: 'ดำเนินการสำเร็จ',
              },
            });
            this.refresh();
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
  onConfirm(form: any) {
    this.apiService.updateUserStatus(form).subscribe({
      next: (res) => {
        if (res.returnCode === '00') {
          this.refresh();
          this.dialog.closeAll();
          this.dialog.open(DefaultDialogComponent, {
            maxHeight: '800px',
            width: '500px',
            data: {
              status: 'ดำเนินการสำเร็จ',
            },
          });
          this.refresh();
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
}
