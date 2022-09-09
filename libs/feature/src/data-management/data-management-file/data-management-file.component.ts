import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataManagementFileFormComponent } from '@dpt/form';

@Component({
  selector: 'dpt-data-management-file',
  templateUrl: './data-management-file.component.html',
  styleUrls: ['./data-management-file.component.scss'],
})
export class DataManagementFileComponent implements AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'order',
    'dataName',
    'department',
    'dataDate',
    'dataList',
    'action',
  ];

  tempData = [
    {
      order: 1,
      fullName: 'test test',
      dataName: 'dataName',
      dataDate: '20/2/2022',
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

      dataDate: '20/2/2022',
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

      dataDate: '20/2/2022',
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

      dataDate: '20/2/2022',
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

      dataDate: '20/2/2022',
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

      dataDate: '20/2/2022',
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

      dataDate: '20/2/2022',
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

      dataDate: '20/2/2022',
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
      dataDate: '20/2/2022',
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

      dataDate: '20/2/2022',
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

      dataDate: '20/2/2022',
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

      dataDate: '20/2/2022',
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

      dataDate: '20/2/2022',
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

      dataDate: '20/2/2022',
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

      dataDate: '20/2/2022',
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
  dataSource = new MatTableDataSource(this.tempData);
  constructor(private dialog: MatDialog) {}
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  sortChange(sortState: Sort | any) {}
  onDownload(a: any) {
    console.log(a);
  }
  onDelete(id: number) {
    console.log('onDelete', id);
  }

  onEdit(id: number) {
    console.log('onView', id);
    const data = {
      dataName: 'dataName',
      dataTable: 'asd',
      dataType: 'API',
      detail: 'detail',
      fileList: [
        {
          fileName: 'test',
          fileSize: '1mb',
        },
        {
          fileName: 'test',
          fileSize: '1mb',
        },
        {
          fileName: 'test',
          fileSize: '1mb',
        },
      ],
      onConfirm: this.onAddDataConfirm.bind(this),
      isEdit: true,
    };

    const dialogRef = this.dialog.open(DataManagementFileFormComponent, {
      data,
      width: '1000px',
    });
  }

  onView(id: number) {
    console.log('onView', id);
    const data = {
      dataName: 'dataName',
      dataTable: 'asd',
      dataType: 'API',
      detail: 'detail',
      fileList: [
        {
          fileName: 'test',
          fileSize: '1mb',
        },
        {
          fileName: 'test',
          fileSize: '1mb',
        },
        {
          fileName: 'test',
          fileSize: '1mb',
        },
      ],
      onConfirm: this.onAddDataConfirm.bind(this),
      isEdit: true,
    };

    const dialogRef = this.dialog.open(DataManagementFileFormComponent, {
      data,
      width: '1000px',
    });
  }

  onApprove(id: number) {
    console.log('onApprove', id);
  }

  onCancel(id: number) {
    console.log('onCancel', id);
  }

  onAddItem() {
    const data = {
      onConfirm: this.onAddDataConfirm.bind(this),
    };
    const dialogRef = this.dialog.open(DataManagementFileFormComponent, {
      data,
      width: '1000px',
    });
  }
  onAddDataConfirm(form: any) {
    console.log(form);
  }
}
