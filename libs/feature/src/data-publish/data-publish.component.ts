import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataRequestFormComponent } from '@dpt/form';

@Component({
  selector: 'dpt-data-publish',
  templateUrl: './data-publish.component.html',
  styleUrls: ['./data-publish.component.scss'],
  providers: [MatPaginatorModule],
})
export class DataPublishComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'order',
    'dataName',
    'department',
    'dataList',
    'status',
    'action',
  ];

  tempData = [
    {
      order: 1,
      fullName: 'test test',
      dataName: 'dataName',
      department: 'test Department',
      dataType: 'CSV',
      dataId: 11,
      dataLink: 'test',
    },
    {
      order: 1,
      fullName: 'test test',
      dataName: 'dataName',
      department: 'test Department',
      dataType: 'PDF',
      dataId: 12,
      dataLink: 'test',
    },
    {
      order: 1,
      fullName: 'test test',
      dataName: 'dataName',
      department: 'test Department',
      dataType: 'CSV',
      dataId: 11,
      dataLink: 'test',
    },
    {
      order: 1,
      fullName: 'test test',
      dataName: 'dataName',
      department: 'test Department',
      dataType: 'CSV',
      dataId: 11,
      dataLink: 'test',
    },
    {
      order: 1,
      fullName: 'test test',
      dataName: 'dataName',
      department: 'test Department',
      dataType: 'CSV',
      dataId: 11,
      dataLink: 'test',
    },
    {
      order: 1,
      fullName: 'test test',
      dataName: 'dataName',
      department: 'test Department',
      dataType: 'CSV',
      dataId: 11,
      dataLink: 'test',
    },
    {
      order: 1,
      fullName: 'test test',
      dataName: 'dataName',
      department: 'test Department',

      dataType: 'PDF',
      dataId: 12,
      dataLink: 'test',
    },
    {
      order: 1,
      fullName: 'test test',
      dataName: 'dataName',
      department: 'test Department',

      dataType: 'PDF',
      dataId: 12,
      dataLink: 'test',
    },
    {
      order: 1,
      fullName: 'test test',
      dataName: 'dataName',
      department: 'test Department',

      dataType: 'CSV',
      dataId: 11,
      dataLink: 'test',
    },
    {
      order: 1,
      fullName: 'test test',
      dataName: 'dataName',
      department: 'test Department',

      dataType: 'PDF',
      dataId: 12,
      dataLink: 'test',
    },
    {
      order: 1,
      fullName: 'test test',
      dataName: 'dataName',
      department: 'test Department',
      dataType: 'CSV',
      dataId: 11,
      dataLink: 'test',
    },
    {
      order: 1,
      fullName: 'test test',
      dataName: 'dataName',
      department: 'test Department',

      dataType: 'PDF',
      dataId: 12,
      dataLink: 'test',
    },
    {
      order: 1,
      fullName: 'test test',
      dataName: 'dataName',
      department: 'test Department',
      dataType: 'CSV',
      dataId: 11,
      dataLink: 'test',
    },
    {
      order: 1,
      fullName: 'test test',
      dataName: 'dataName',
      department: 'test Department',

      dataType: 'PDF',
      dataId: 12,
      dataLink: 'test',
    },
    {
      order: 1,
      fullName: 'test test',
      dataName: 'dataName',
      department: 'test Department',
      dataType: 'PDF',
      dataId: 12,
      dataLink: 'test',
    },
  ];
  statusList = [
    {
      label: 'เผยแพร่',
      value: 1,
    },
    {
      label: 'รอออนุมัติ',
      value: 2,
    },
    {
      label: 'ถูกจัดเก็บ',
      value: 3,
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
  onDownload(a: any) {
    console.log(a);
  }
  onView(id: number) {
    console.log('onView', id);
    const data = {
      departmentType: 1,
      department: 'test',
      requestFullName: 'test test',
      category: 'test category',
      userName: 'userName',
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
