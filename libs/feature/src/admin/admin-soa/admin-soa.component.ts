import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminSaoFormComponent, DefaultDialogComponent } from '@dpt/form';
import { MainApiService } from '@dpt/shared';
import { SaoApiService, SaoGlobal } from 'libs/shared/src/lib/share.model';

@Component({
  selector: 'dpt-admin-soa',
  templateUrl: './admin-soa.component.html',
  styleUrls: ['./admin-soa.component.scss'],
})
export class AdminSoaComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'order',
    'apiName',
    'fullName',
    'tokenCode',
    'maxLimit',
    'timePeriod',
    'action',
  ];

  saoGlobal?: SaoGlobal;
  dataSource = new MatTableDataSource<SaoApiService>([]);
  constructor(
    private dialog: MatDialog,
    private mainApiService: MainApiService
  ) {}
  ngOnInit(): void {
    this.refresh();
  }
  refresh() {
    this.mainApiService.getSaoGlobal().subscribe((res) => {
      this.saoGlobal = res.SoaConfig[0];
    });
    this.mainApiService.getSaoList().subscribe((res) => {
      if (res.returnCode === '00') {
        this.dataSource.data = res.datareturn;
      }
    });
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  sortChange(sortState: Sort | any) {}

  onEdit(row: SaoApiService) {
    const data = {
      adminSao: {
        tokenId: row.tokenId,
        maxLimit: row.maxLimit,
        timePeriod: row.timePeriod,
      },
      onConfirm: this.editData.bind(this, false),
    };

    const dialogRef = this.dialog.open(AdminSaoFormComponent, {
      data,
      width: '1000px',
    });
  }
  onEditGlobal() {
    const data = {
      adminSao: {
        maxLimit: this.saoGlobal?.maxCallsLimit ?? '',
        timePeriod: this.saoGlobal?.timePeriod,
      },
      onConfirm: this.editData.bind(this, true),
    };
    const dialogRef = this.dialog.open(AdminSaoFormComponent, {
      data,
      width: '1000px',
    });
  }
  editData(isGlobal = false, form: any) {
    if (isGlobal) {
      this.mainApiService
        .updateSaoGlobalConfig({
          maxLimit: form.maxLimit,
          timePeriod: form.timePeriod,
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
      this.mainApiService
        .updateSaoConfig({
          maxLimit: form.maxLimit,
          timePeriod: form.timePeriod,
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
}
