import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataRequestFormComponent } from 'libs/form/src/data-request-form/data-request-form.component';

@Component({
  selector: 'dpt-data-request-admin',
  templateUrl: './data-request-admin.component.html',
  styleUrls: ['./data-request-admin.component.scss'],
})
export class DataRequestAdminComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'order',
    'fullName',
    'department',
    'userName',
    'dataName',
    'action',
  ];

  tempData = [
    {
      order: 1,
      fullName: 'test test',
      userName: 'userName',
      department: 'test Department',
      dataName: 'test data',
      dataPath: 'path data',
      dataDate: '2020/22/08',
    },
    {
      order: 1,
      fullName: 'test test',
      userName: 'userName',
      department: 'test Department',
      dataName: 'test data',
      dataPath: 'path data',
      dataDate: '2020/22/08',
    },
    {
      order: 1,
      fullName: 'test test',
      userName: 'userName',
      department: 'test Department',
      dataName: 'test data',
      dataPath: 'path data',
      dataDate: '2020/22/08',
    },
    {
      order: 1,
      fullName: 'test test',
      userName: 'userName',
      department: 'test Department',
      dataName: 'test data',
      dataPath: 'path data',
      dataDate: '2020/22/08',
    },
    {
      order: 1,
      fullName: 'test test',
      userName: 'userName',
      department: 'test Department',
      dataName: 'test data',
      dataPath: 'path data',
      dataDate: '2020/22/08',
    },
    {
      order: 1,
      fullName: 'test test',
      userName: 'userName',
      department: 'test Department',
      dataName: 'test data',
      dataPath: 'path data',
      dataDate: '2020/22/08',
    },
    {
      order: 1,
      fullName: 'test test',
      userName: 'userName',
      department: 'test Department',
      dataName: 'test data',
      dataPath: 'path data',
      dataDate: '2020/22/08',
    },
    {
      order: 1,
      fullName: 'test test',
      userName: 'userName',
      department: 'test Department',
      dataName: 'test data',
      dataPath: 'path data',
      dataDate: '2020/22/08',
    },
    {
      order: 1,
      fullName: 'test test',
      userName: 'userName',
      department: 'test Department',
      dataName: 'test data',
      dataPath: 'path data',
      dataDate: '2020/22/08',
    },
    {
      order: 1,
      fullName: 'test test',
      userName: 'userName',
      department: 'test Department',
      dataName: 'test data',
      dataPath: 'path data',
      dataDate: '2020/22/08',
    },
    {
      order: 1,
      fullName: 'test test',
      userName: 'userName',
      department: 'test Department',
      dataName: 'test data',
      dataPath: 'path data',
      dataDate: '2020/22/08',
    },
    {
      order: 1,
      fullName: 'test test',
      userName: 'userName',
      department: 'test Department',
      dataName: 'test data',
      dataPath: 'path data',
      dataDate: '2020/22/08',
    },
    {
      order: 1,
      fullName: 'test test',
      userName: 'userName',
      department: 'test Department',
      dataName: 'test data',
      dataPath: 'path data',
      dataDate: '2020/22/08',
    },
    {
      order: 1,
      fullName: 'test test',
      userName: 'userName',
      department: 'test Department',
      dataName: 'test data',
      dataPath: 'path data',
      dataDate: '2020/22/08',
    },
    {
      order: 1,
      fullName: 'test test',
      userName: 'userName',
      department: 'test Department',
      dataName: 'test data',
      dataPath: 'path data',
      dataDate: '2020/22/08',
    },
  ];
  dataSource = new MatTableDataSource(this.tempData);
  constructor(private dialog: MatDialog) {}
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {}
  sortChange(sortState: Sort | any) {}
  onApprove(id: number) {
    console.log('onApprove', id);
  }
  onCancel(id: number) {
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
