import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataManagementDataSetFormComponent } from '@dpt/form';

@Component({
  selector: 'dpt-data-management-data-set',
  templateUrl: './data-management-data-set.component.html',
  styleUrls: ['./data-management-data-set.component.scss'],
})
export class DataManagementDataSetComponent implements AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'order',
    'dataName',
    'department',
    'dataList',
    'publishStatus',
    'action',
  ];

  tempData = [
    {
      order: 1,
      fullName: 'test test',
      publishStatus: 'ทั่วไป',
      dataName: 'dataName',
      department: 'test Department',
      dataType: 'CSV',
      dataId: 11,
    },
    {
      order: 1,
      fullName: 'test test',
      publishStatus: 'ทั่วไป',
      dataName: 'dataName',
      department: 'test Department',
      dataType: 'PDF',
      dataId: 12,
      dataLink: 'test',
    },
    {
      order: 1,
      fullName: 'test test',
      publishStatus: 'ทั่วไป',
      dataName: 'dataName',
      department: 'test Department',
      dataType: 'CSV',
      dataId: 11,
      dataLink: 'test',
    },
    {
      order: 1,
      fullName: 'test test',
      publishStatus: 'ทั่วไป',
      dataName: 'dataName',
      department: 'test Department',
      dataType: 'CSV',
      dataId: 11,
      dataLink: 'test',
    },
    {
      order: 1,
      fullName: 'test test',
      publishStatus: 'ทั่วไป',
      dataName: 'dataName',
      department: 'test Department',
      dataType: 'CSV',
      dataId: 11,
      dataLink: 'test',
    },
    {
      order: 1,
      fullName: 'test test',
      publishStatus: 'ทั่วไป',
      dataName: 'dataName',
      department: 'test Department',
      dataType: 'CSV',
      dataId: 11,
      dataLink: 'test',
    },
    {
      order: 1,
      fullName: 'test test',
      publishStatus: 'ทั่วไป',
      dataName: 'dataName',
      department: 'test Department',

      dataType: 'PDF',
      dataId: 12,
      dataLink: 'test',
    },
    {
      order: 1,
      fullName: 'test test',
      publishStatus: 'ทั่วไป',
      dataName: 'dataName',
      department: 'test Department',

      dataType: 'PDF',
      dataId: 12,
      dataLink: 'test',
    },
    {
      order: 1,
      fullName: 'test test',
      publishStatus: 'ทั่วไป',
      dataName: 'dataName',
      department: 'test Department',

      dataType: 'CSV',
      dataId: 11,
      dataLink: 'test',
    },
    {
      order: 1,
      fullName: 'test test',
      publishStatus: 'ทั่วไป',
      dataName: 'dataName',
      department: 'test Department',

      dataType: 'PDF',
      dataId: 12,
      dataLink: 'test',
    },
    {
      order: 1,
      fullName: 'test test',
      publishStatus: 'ทั่วไป',
      dataName: 'dataName',
      department: 'test Department',
      dataType: 'CSV',
      dataId: 11,
      dataLink: 'test',
    },
    {
      order: 1,
      fullName: 'test test',
      publishStatus: 'ทั่วไป',
      dataName: 'dataName',
      department: 'test Department',

      dataType: 'PDF',
      dataId: 12,
      dataLink: 'test',
    },
    {
      order: 1,
      fullName: 'test test',
      publishStatus: 'ทั่วไป',
      dataName: 'dataName',
      department: 'test Department',
      dataType: 'CSV',
      dataId: 11,
      dataLink: 'test',
    },
    {
      order: 1,
      fullName: 'test test',
      publishStatus: 'ทั่วไป',
      dataName: 'dataName',
      department: 'test Department',

      dataType: 'PDF',
      dataId: 12,
      dataLink: 'test',
    },
    {
      order: 1,
      fullName: 'test test',
      publishStatus: 'ทั่วไป',
      dataName: 'dataName',
      department: 'test Department',
      dataType: 'PDF',
      dataId: 12,
      dataLink: 'test',
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
      category: 'test value',
      column: 'asd',
      connectionString: 'asd',
      dataName: 'dataName',
      dataTable: 'asd',
      dataType: 'API',
      detail: 'detail',
      link: 'asdsa',
      publishStatus: 'test value',
      publishSubStatus: 'test value',
      subCategory: 'test value',
      onConfirm: this.onAddDataConfirm.bind(this),
      isEdit: true,
    };

    const dialogRef = this.dialog.open(DataManagementDataSetFormComponent, {
      data,
      width: '1000px',
    });
  }
  onAddItem() {
    const data = {
      onConfirm: this.onAddDataConfirm.bind(this),
    };
    const dialogRef = this.dialog.open(DataManagementDataSetFormComponent, {
      data,
      width: '1000px',
    });
  }
  onAddDataConfirm(form: any) {
    console.log(form);
  }
}
