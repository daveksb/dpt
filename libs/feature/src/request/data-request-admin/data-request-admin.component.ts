import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  ApproveDepartmentFormComponent,
  DataRequestFormComponent,
  FileListFormComponent,
} from '@dpt/form';
import { Department, UserService, MainApiService } from '@dpt/shared';

@Component({
  selector: 'dpt-data-request-admin',
  templateUrl: './data-request-admin.component.html',
  styleUrls: ['./data-request-admin.component.scss'],
})
export class DataRequestAdminComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  readonly displayedColumnsDefault: string[] = [
    'order',
    'fullName',
    'department',
    'dataName',
    'approval',
    'action',
  ];
  readonly displayedColumnsUser: string[] = [
    'order',
    'department',
    'dataName',
    'status',
    'action',
  ];
  departmentList: Department[] = [];
  displayedColumns: string[] = this.displayedColumnsUser;

  dataSource = new MatTableDataSource<any>([]);
  roleId = '';
  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private mainApiService: MainApiService
  ) {}
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.mainApiService.getDepartment().subscribe((a) => {
      this.departmentList = a.Department as Department[];
    });
    // 1	ผู้ดูแลระบบ
    // 2	ผู้ใช้งานระบบภายนอก
    // 3	ผู้ใช้งานระบบภายใน
    // 4	เลขานุการ
    // 5	เจ้าของข้อมูล
    // 6	เจ้าของข้อมูล (Admin)
    // to do
    this.refresh();
    // this.mainApiService.getPublishList
  }
  refresh() {
    const role = this.userService.getUser()?.role.roleId;
    this.roleId = role ?? '';
    if (role) {
      switch (role?.toString()) {
        case '1':
          this.mainApiService.getRequestApiUser().subscribe((res) => {
            if (res.returnCode === '00') {
              this.displayedColumns = this.displayedColumnsUser;
              this.dataSource.data = res.datareturn;
            }
          });

          break;
        case '2':
          this.mainApiService.getRequestApiUser().subscribe((res) => {
            if (res.returnCode === '00') {
              this.displayedColumns = this.displayedColumnsUser;
              this.dataSource.data = res.datareturn;
            }
          });
          break;
        case '3':
          this.mainApiService.getRequestApiUser().subscribe((res) => {
            if (res.returnCode === '00') {
              this.displayedColumns = this.displayedColumnsUser;
              this.dataSource.data = res.datareturn;
            }
          });
          break;
        case '4':
          this.mainApiService.getRequestApiSecretary().subscribe((res) => {
            if (res.returnCode === '00') {
              this.displayedColumns = this.displayedColumnsUser;
              this.dataSource.data = res.datareturn;
            }
            this.displayedColumns = this.displayedColumnsDefault;
          });
          break;
        case '5':
          this.mainApiService
            .getRequestApiDepart(
              this.userService.getUser()?.department.departmentId ?? ''
            )
            .subscribe((res) => {
              if (res.returnCode === '00') {
                this.displayedColumns = this.displayedColumnsDefault;
                this.dataSource.data = res.datareturn;
              }
            });
          break;
        case '6':
          this.mainApiService
            .getRequestApiDepart(
              this.userService.getUser()?.department.departmentId ?? ''
            )
            .subscribe((res) => {
              if (res.returnCode === '00') {
                this.displayedColumns = this.displayedColumnsDefault;
                this.dataSource.data = res.datareturn;
              }
            });
          break;
      }
    }
  }
  sortChange(sortState: Sort | any) {}
  onApprove(id: string, userId?: string) {
    const dialogRef = this.dialog.open(ApproveDepartmentFormComponent, {
      data: {
        departments: this.departmentList,
        approve: this.userService.getUser()?.role.roleId === '4' ? 'P' : 'A',
        reqId: id,
        userId: this.userService.getUser()?.userId,
        roleId: this.userService.getUser()?.role.roleId,
        reqUserId: userId,
        depId: this.userService.getUser()?.department.departmentId,
      },
      maxHeight: '800px',
      width: '1000px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.refresh();
    });
  }
  onCancel(id: number, userId?: string) {
    const dialogRef = this.dialog.open(ApproveDepartmentFormComponent, {
      data: {
        departments: this.departmentList,
        approve: 'D',
        reqId: id,
        userId: this.userService.getUser()?.userId,
        roleId: this.userService.getUser()?.role.roleId,
        depId: this.userService.getUser()?.department.departmentId,
        reqUserId: userId,
      },
      maxHeight: '800px',
      width: '1000px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.refresh();
    });
  }
  onView(id: number) {
    const data = {
      departmentType: 1,
      department: 'test',
      requestFullName: 'test test',
      category: 'test category',
      dataName: 'dataName',
      detail: 'detail',
      files: [
        {
          name: 'name',
          fileSize: 50,
        },
        {
          name: 'name',
          fileSize: 50,
        },
      ],
    };
    const dialogRef = this.dialog.open(DataRequestFormComponent, {
      data,
      maxHeight: '800px',
      width: '1000px',
    });
  }

  getStatus(status: string) {
    if (status === 'P') {
      return 'รออนุมัติ';
    }
    if (status === 'A') {
      return 'อนุมัติ';
    }
    if (status === 'D') {
      return 'ไม่อนุมัติ';
    }
    return '';
  }
  getStatusIcon(status: string) {
    if (status === 'P') {
      return 'Pending';
    }
    if (status === 'A') {
      return 'Activate';
    }
    if (status === 'D') {
      return 'Decline';
    }
    return '';
  }
  viewFile(row: any) {
    this.mainApiService
      .getRequestApiUserFile(
        row.reqFile,
        row.userId ?? this.userService.getUser()?.userId
      )
      .subscribe({
        next: (res) => {
          const dialogRef = this.dialog.open(FileListFormComponent, {
            data: {
              fileList: res.datareturn,
              apiDetail: row,
            },
            maxHeight: '800px',
            width: '1000px',
          });
        },
        error: () => {
          const dialogRef = this.dialog.open(FileListFormComponent, {
            data: {
              fileList: [],
              apiDetail: row,
            },
            maxHeight: '800px',
            width: '1000px',
          });
        },
      });
  }
}
