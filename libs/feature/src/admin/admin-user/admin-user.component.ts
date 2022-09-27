import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataRequestFormComponent } from '@dpt/form';
import { MainApiService } from '@dpt/shared';
import { AdminUserList } from 'libs/shared/src/lib/share.model';

@Component({
  selector: 'dpt-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss'],
})
export class AdminUserComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'order',
    'fullName',
    'department',
    'email',
    'userName',
    'roleName',
    'action',
  ];

  dataSource = new MatTableDataSource();
  constructor(private dialog: MatDialog, private apiService: MainApiService) {}
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.apiService.getAdminUserList().subscribe((res) => {
      if (res.datareturn) {
        this.dataSource = new MatTableDataSource<any>(res.datareturn);
      }
    });
  }
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
