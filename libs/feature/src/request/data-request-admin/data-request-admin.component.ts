import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApproveDepartmentFormComponent } from '@dpt/form';
import { Department, MainApiService, UserService } from '@dpt/shared';
import { DataRequestFormComponent } from 'libs/form/src/data-request-form/data-request-form.component';
import { FileListFormComponent } from 'libs/form/src/file-list-form/file-list-form.component';

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
  onApprove(id: string) {
    const dialogRef = this.dialog.open(ApproveDepartmentFormComponent, {
      data: {
        departments: this.departmentList,
        approve: 'A',
        reqId: id,
        userId: this.userService.getUser()?.userId,
        roleId: '5',
        depId: this.userService.getUser()?.department.departmentId,
      },
      maxHeight: '800px',
      width: '1000px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.refresh();
    });
  }
  onCancel(id: number) {
    const dialogRef = this.dialog.open(ApproveDepartmentFormComponent, {
      data: {
        departments: this.departmentList,
        approve: 'D',
        reqId: id,
        userId: this.userService.getUser()?.userId,
        roleId: this.userService.getUser()?.role.roleId,
        depId: this.userService.getUser()?.department.departmentId,
        //reqUserId: this
      },
      maxHeight: '800px',
      width: '1000px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.refresh();
    });
  }
  onView(id: number) {
    console.log('onView', id);
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
      return 'Pending';
    }
    if (status === 'A') {
      return 'Approve';
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
        this.userService.getUser()?.userId ?? ''
      )
      .subscribe((res) => {
        if (res.returnCode === '00') {
          const dialogRef = this.dialog.open(FileListFormComponent, {
            data: res.datareturn,
            maxHeight: '800px',
            width: '1000px',
          });
        } else {
          alert(res.returnMessage);
        }
      });
  }
}
