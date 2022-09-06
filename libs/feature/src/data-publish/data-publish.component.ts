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
      dataList: [
        {
          dataType: 'CSV',
          dataId: 11,
          dataLink: 'test',
        },
      ],
    },
    {
      order: 1,
      fullName: 'test test',
      dataName: 'dataName',
      department: 'test Department',
      dataList: [
        {
          dataType: 'PDF',
          dataId: 12,
          dataLink: 'test',
        },
      ],
    },
    {
      order: 1,
      fullName: 'test test',
      dataName: 'dataName',
      department: 'test Department',
      dataList: [
        {
          dataType: 'CSV',
          dataId: 11,
          dataLink: 'test',
        },
        {
          dataType: 'PDF',
          dataId: 12,
          dataLink: 'test',
        },
      ],
    },
    {
      order: 1,
      fullName: 'test test',
      dataName: 'dataName',
      department: 'test Department',
      dataList: [
        {
          dataType: 'CSV',
          dataId: 11,
          dataLink: 'test',
        },
        {
          dataType: 'PDF',
          dataId: 12,
          dataLink: 'test',
        },
      ],
    },
    {
      order: 1,
      fullName: 'test test',
      dataName: 'dataName',
      department: 'test Department',
      dataList: [
        {
          dataType: 'CSV',
          dataId: 11,
          dataLink: 'test',
        },
      ],
    },
    {
      order: 1,
      fullName: 'test test',
      dataName: 'dataName',
      department: 'test Department',
      dataList: [
        {
          dataType: 'CSV',
          dataId: 11,
          dataLink: 'test',
        },
        {
          dataType: 'PDF',
          dataId: 12,
          dataLink: 'test',
        },
      ],
    },
    {
      order: 1,
      fullName: 'test test',
      dataName: 'dataName',
      department: 'test Department',
      dataList: [
        {
          dataType: 'CSV',
          dataId: 11,
          dataLink: 'test',
        },
        {
          dataType: 'PDF',
          dataId: 12,
          dataLink: 'test',
        },
      ],
    },
    {
      order: 1,
      fullName: 'test test',
      dataName: 'dataName',
      department: 'test Department',
      dataList: [
        {
          dataType: 'PDF',
          dataId: 12,
          dataLink: 'test',
        },
      ],
    },
    {
      order: 1,
      fullName: 'test test',
      dataName: 'dataName',
      department: 'test Department',
      dataList: [
        {
          dataType: 'CSV',
          dataId: 11,
          dataLink: 'test',
        },
        {
          dataType: 'PDF',
          dataId: 12,
          dataLink: 'test',
        },
      ],
    },
    {
      order: 1,
      fullName: 'test test',
      dataName: 'dataName',
      department: 'test Department',
      dataList: [
        {
          dataType: 'CSV',
          dataId: 11,
          dataLink: 'test',
        },
        {
          dataType: 'PDF',
          dataId: 12,
          dataLink: 'test',
        },
      ],
    },
    {
      order: 1,
      fullName: 'test test',
      dataName: 'dataName',
      department: 'test Department',
      dataList: [
        {
          dataType: 'CSV',
          dataId: 11,
          dataLink: 'test',
        },
        {
          dataType: 'PDF',
          dataId: 12,
          dataLink: 'test',
        },
      ],
    },
    {
      order: 1,
      fullName: 'test test',
      dataName: 'dataName',
      department: 'test Department',
      dataList: [
        {
          dataType: 'CSV',
          dataId: 11,
          dataLink: 'test',
        },
        {
          dataType: 'PDF',
          dataId: 12,
          dataLink: 'test',
        },
      ],
    },
    {
      order: 1,
      fullName: 'test test',
      dataName: 'dataName',
      department: 'test Department',
      dataList: [
        {
          dataType: 'CSV',
          dataId: 11,
          dataLink: 'test',
        },
        {
          dataType: 'PDF',
          dataId: 12,
          dataLink: 'test',
        },
      ],
    },
    {
      order: 1,
      fullName: 'test test',
      dataName: 'dataName',
      department: 'test Department',
      dataList: [
        {
          dataType: 'CSV',
          dataId: 11,
          dataLink: 'test',
        },
        {
          dataType: 'PDF',
          dataId: 12,
          dataLink: 'test',
        },
      ],
    },
    {
      order: 1,
      fullName: 'test test',
      dataName: 'dataName',
      department: 'test Department',
      dataList: [
        {
          dataType: 'CSV',
          dataId: 11,
          dataLink: 'test',
        },
        {
          dataType: 'PDF',
          dataId: 12,
          dataLink: 'test',
        },
      ],
    },
  ];
  statusList = [
    {
      label: 'Published',
      value: 1,
    },
    {
      label: 'Pending',
      value: 2,
    },
    {
      label: 'Archive',
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
  sortChange(sortState: Sort | any) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
  }
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
