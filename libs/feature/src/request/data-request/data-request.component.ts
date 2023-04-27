import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  DeclineDepartmentFormComponent,
  DefaultDialogComponent,
} from '@dpt/form';
import { Department, MainApiService, UserService } from '@dpt/shared';
import { FileListFormComponent } from 'libs/form/src/file-list-form/file-list-form.component';
@Component({
  selector: 'dpt-data-request',
  templateUrl: './data-request.component.html',
  styleUrls: ['./data-request.component.scss'],
})
export class DataRequestComponent implements OnInit {
  @ViewChild('admin') adminRef!: ElementRef<HTMLDivElement>;
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

  departmentList: Department[] = [];
  displayedColumns: string[] = this.displayedColumnsDefault;

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
    if (role === '5' || role === '6') {
      this.mainApiService
        .getRequestApiData(
          this.userService.getUser()?.department.departmentId ?? ''
        )
        .subscribe({
          next: (res) => {
            if (res.returnCode === '00') {
              this.dataSource.data = res.datareturn;
            } else {
              this.dataSource.data = [];
            }
          },
          error: () => {
            this.dataSource.data = [];
          },
        });
    }
  }
  sortChange(sortState: Sort | any) {}
  onApprove(tokenId?: string) {
    this.mainApiService
      .updateApprovalDepartmentPrivate({
        tokenId: tokenId,
        depUserId: this.userService.getUser()?.userId,
        approve: 'Y',
      })
      .subscribe({
        next: (res) => {
          if (res.returnCode === '00' || res.returnCode === '01') {
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
  onCancel(name: string, tokenId?: string) {
    const dialogRef = this.dialog.open(DeclineDepartmentFormComponent, {
      data: {
        tokenId: tokenId,
        depUserId: this.userService.getUser()?.userId,
        name: name,
        approve: 'N',
      },
      maxHeight: '800px',
      width: '1000px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.refresh();
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
            minWidth: '800px',
          });
        },
        error: () => {
          const dialogRef = this.dialog.open(FileListFormComponent, {
            data: {
              fileList: [],
              apiDetail: row,
            },
            maxHeight: '800px',
            minWidth: '800px',
          });
        },
      });
  }
  pageChange(page: any) {
    if (page.previousPageIndex !== page?.pageIndex) {
      this.adminRef.nativeElement.scrollTop = 0;
    }
  }
}
