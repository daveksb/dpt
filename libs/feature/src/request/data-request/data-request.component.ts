import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MainApiService, RequestApiData, UserService } from '@dpt/shared';
import { DataRequestFormComponent } from 'libs/form/src/data-request-form/data-request-form.component';
import { FileListFormComponent } from 'libs/form/src/file-list-form/file-list-form.component';
@Component({
  selector: 'dpt-data-request',
  templateUrl: './data-request.component.html',
  styleUrls: ['./data-request.component.scss'],
})
export class DataRequestComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'order',
    'fullName',
    'department',
    'dataName',
    'status',
    'action',
  ];

  apiList: RequestApiData[] = [];
  dataSource = new MatTableDataSource<any>([]);
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
    // 1	ผู้ดูแลระบบ
    // 2	ผู้ใช้งานระบบภายนอก
    // 3	ผู้ใช้งานระบบภายใน
    // 4	เลขานุการ
    // 5	เจ้าของข้อมูล
    // 6	เจ้าของข้อมูล (Admin)
    //todo
    const role = this.userService.getUser()?.role.roleId;
    this.mainApiService
      .getRequestApiData(
        this.userService.getUser()?.department.departmentId ?? ''
      )
      .subscribe((res) => {
        if (res.returnCode === '00') {
          this.dataSource.data = res.datareturn;
        } else {
          this.dataSource.data = [];
        }
      });
  }
  sortChange(sortState: Sort | any) {}
  onDownload(row: any) {
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

  onView(id: number) {
    console.log('onView', id);
    // const data = {
    //   departmentType: 1,
    //   department: 'test',
    //   requestFullName: 'test test',
    //   category: 'test category',
    //   dataName: 'dataName',
    //   detail: 'detail',
    //   files: [
    //     {
    //       name: 'name',
    //       fileSize: 50,
    //     },
    //     {
    //       name: 'name',
    //       fileSize: 50,
    //     },
    //   ],
    // };
    // const dialogRef = this.dialog.open(DataRequestFormComponent, {
    //   data,
    //   maxHeight: '800px',
    //   width: '1000px',
    // });
  }

  getStatus(s: string) {
    if (s === 'Y') {
      return 'Approve';
    } else {
      return 'Decline';
    }
  }
}
