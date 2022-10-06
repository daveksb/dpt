import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '@dpt/shared';
import { DataRequestFormComponent } from 'libs/form/src/data-request-form/data-request-form.component';
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

  tempData = [
    {
      order: 1,
      fullName: 'test test',
      status: 'Activate',
      department: 'test Department',
      dataName: 'test data',
      dataPath: 'path data',
      dataDate: '2020/22/08',
    },
    {
      order: 1,
      fullName: 'test test',
      status: 'Activate',
      department: 'test Department',
      dataName: 'test data',
      dataPath: 'path data',
      dataDate: '2020/22/08',
    },
    {
      order: 1,
      fullName: 'test test',
      status: 'Decline',
      department: 'test Department',
      dataName: 'test data',
      dataPath: 'path data',
      dataDate: '2020/22/08',
    },
    {
      order: 1,
      fullName: 'test test',
      status: 'Pending',
      department: 'test Department',
      dataName: 'test data',
      dataPath: 'path data',
      dataDate: '2020/22/08',
    },
    {
      order: 1,
      fullName: 'test test',
      status: 'Activate',
      department: 'test Department',
      dataName: 'test data',
      dataPath: 'path data',
      dataDate: '2020/22/08',
    },
    {
      order: 1,
      fullName: 'test test',
      status: 'Activate',
      department: 'test Department',
      dataName: 'test data',
      dataPath: 'path data',
      dataDate: '2020/22/08',
    },
    {
      order: 1,
      fullName: 'test test',
      status: 'Activate',
      department: 'test Department',
      dataName: 'test data',
      dataPath: 'path data',
      dataDate: '2020/22/08',
    },
    {
      order: 1,
      fullName: 'test test',
      status: 'Activate',
      department: 'test Department',
      dataName: 'test data',
      dataPath: 'path data',
      dataDate: '2020/22/08',
    },
    {
      order: 1,
      fullName: 'test test',
      status: 'Activate',
      department: 'test Department',
      dataName: 'test data',
      dataPath: 'path data',
      dataDate: '2020/22/08',
    },
    {
      order: 1,
      fullName: 'test test',
      status: 'Activate',
      department: 'test Department',
      dataName: 'test data',
      dataPath: 'path data',
      dataDate: '2020/22/08',
    },
    {
      order: 1,
      fullName: 'test test',
      status: 'Activate',
      department: 'test Department',
      dataName: 'test data',
      dataPath: 'path data',
      dataDate: '2020/22/08',
    },
    {
      order: 1,
      fullName: 'test test',
      status: 'Activate',
      department: 'test Department',
      dataName: 'test data',
      dataPath: 'path data',
      dataDate: '2020/22/08',
    },
    {
      order: 1,
      fullName: 'test test',
      status: 'Activate',
      department: 'test Department',
      dataName: 'test data',
      dataPath: 'path data',
      dataDate: '2020/22/08',
    },
    {
      order: 1,
      fullName: 'test test',
      status: 'Activate',
      department: 'test Department',
      dataName: 'test data',
      dataPath: 'path data',
      dataDate: '2020/22/08',
    },
    {
      order: 1,
      fullName: 'test test',
      status: 'Activate',
      department: 'test Department',
      dataName: 'test data',
      dataPath: 'path data',
      dataDate: '2020/22/08',
    },
  ];
  dataSource = new MatTableDataSource(this.tempData);
  constructor(private dialog: MatDialog, private userService: UserService) {}
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
  }
  sortChange(sortState: Sort | any) {}
  onDownload(id: number) {
    console.log('onApprove', id);
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
}
