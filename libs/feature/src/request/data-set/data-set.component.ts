import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  DefaultDialogComponent,
  AdminDepartmentFormComponent,
} from '@dpt/form';
import { MainApiService, AdminDepartment } from '@dpt/shared';
@Component({
  selector: 'dpt-data-set',
  templateUrl: './data-set.component.html',
  styleUrls: ['./data-set.component.scss'],
})
export class DataSetComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'order',
    'apiName',
    'fullName',
    'tokenCode',
    'zone',
    'createDate',
    'expireDate',
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
      .deleteAdminDepartment({
        departmentId: id,
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
  onEdit(row: AdminDepartment) {
    const data = {
      onConfirm: this.onConfirm.bind(this, true),
      isEdit: true,
      adminDepartment: row,
    };
    const dialogRef = this.dialog.open(AdminDepartmentFormComponent, {
      data,
      maxHeight: '800px',
      width: '1000px',
    });
  }
  onAdd() {
    const data = {
      onConfirm: this.onConfirm.bind(this, false),
      isEdit: false,
    };
    const dialogRef = this.dialog.open(AdminDepartmentFormComponent, {
      data,
      maxHeight: '800px',
      width: '1000px',
    });
  }
  onConfirm(isEdit: boolean, form: any) {
    if (isEdit) {
      this.apiService
        .updateAdminDepartment({
          departmentId: form.value.departmentId,
          departmentName: form.value.departmentName,
          departmentMember: form.value.departmentMember,
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
    } else {
      this.apiService
        .addAdminDepartment({
          departmentName: form.value.departmentName,
          departmentMember: form.value.departmentMember,
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
}