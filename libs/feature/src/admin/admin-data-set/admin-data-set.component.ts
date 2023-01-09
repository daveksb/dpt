import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  AdminDataSetFormComponent,
  AdminDepartmentFormComponent,
  DefaultDialogComponent,
} from '@dpt/form';
import { MainApiService } from '@dpt/shared';
import { AdminData, AdminDepartment } from 'libs/shared/src/lib/share.model';

@Component({
  selector: 'dpt-admin-data-set',
  templateUrl: './admin-data-set.component.html',
  styleUrls: ['./admin-data-set.component.scss'],
})
export class AdminDataSetComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'order',
    'apiName',
    'fullName',
    'zone',
    'createDate',
    'expireDate',
    'action',
  ];

  dataSource = new MatTableDataSource();
  constructor(private dialog: MatDialog, private apiService: MainApiService) {}
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.refresh();
  }
  refresh() {
    this.apiService.getAdminDatatList().subscribe((res) => {
      if (res.datareturn) {
        this.dataSource.data = res.datareturn;
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
  onDelete(id: string) {
    this.apiService
      .deleteAdminDataSet({
        tokenId: id,
      })
      .subscribe({
        next: (res) => {
          if (res.returnCode === '00') {
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
  onEdit(row: AdminData) {
    const data = {
      onConfirm: this.onConfirm.bind(this),
      tokenId: row.tokenId,
      status: row.status,
    };
    const dialogRef = this.dialog.open(AdminDataSetFormComponent, {
      data,
      maxHeight: '800px',
      width: '1000px',
    });
  }

  onConfirm(form: any) {
    this.apiService
      .updateAdminDataSet({
        status: form.status,
        countdatetemp: form.countdate,
        countdate: form.countdate,
        tokenId: form.tokenId,
      })
      .subscribe({
        next: (res) => {
          if (res.returnCode === '00') {
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
}
