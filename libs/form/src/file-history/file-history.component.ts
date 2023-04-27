import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Category,
  DataReturn,
  Privacy,
  DataType,
  CategoryGroup,
  Province,
  ApiType,
  MainApiService,
  UserService,
  InsertApiRequest,
  UpdateApiRequest,
  FileHistory,
} from '@dpt/shared';
import { DataManagementDataSetFormComponent } from '../data-management-data-set-form/data-management-data-set-form.component';
import { DefaultDialogComponent } from '../default-dialog/default-dialog.component';

@Component({
  selector: 'dpt-file-history',
  templateUrl: './file-history.component.html',
  styleUrls: ['./file-history.component.scss'],
})
export class FileHistoryComponent implements AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  form = new FormControl();
  categoryForm = new FormControl();
  category: Category[] = [];

  displayedColumns: string[] = [
    'order',
    'originalFileName',
    'timestamp',
    'action',
  ];

  currentData: FileHistory[] = [];
  defaultData: FileHistory[] = [];
  privacyList: Privacy[] = [];
  dataTypeList: DataType[] = [];
  categoryGroupList: CategoryGroup[] = [];
  provinceList: Province[] = [];
  apiTypeList: ApiType[] = [];
  dataSource = new MatTableDataSource(this.defaultData);
  departmentId = '';
  constructor(
    private dialog: MatDialog,
    private mainApiService: MainApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.refresh();
  }

  refresh() {
    const apiId = this.route.snapshot.params['id'];
    if (apiId) {
      this.mainApiService.getSelectHistoryfile(apiId).subscribe((data) => {
        this.dataSource.data = data.datareturn;
        this.defaultData = data.datareturn;
      });
    } else {
      this.router.navigate(['data-management']);
    }
  }

  onDelete(hid: number, fileName: string) {
    this.mainApiService
      .deleteSelectHistoryfile({
        hid,
        fileName,
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
