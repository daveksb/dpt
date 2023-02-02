import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataRequestFormComponent, DefaultDialogComponent } from '@dpt/form';
import { MainApiService } from '@dpt/shared';
import { DataReturn } from '@dpt/shared';
import { Router } from '@angular/router';
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

  statusList = [
    {
      label: 'เผยแพร่',
      value: 'Y',
      icon: 'activate',
    },

    {
      label: 'ไม่เผยเเพร่',
      value: 'N',
      icon: 'archive',
    },
  ];
  publishList: DataReturn[] = [];
  defaultList: DataReturn[] = [];
  dataSource = new MatTableDataSource<DataReturn>([]);
  page = 0;
  pageSize = 10;
  form = new FormControl();
  constructor(
    private dialog: MatDialog,
    private mainApiservice: MainApiService,
    private router: Router
  ) {}
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.refresh();
  }
  refresh() {
    this.mainApiservice.getPublishList().subscribe((res) => {
      if (res.returnCode === '00') {
        this.publishList = res.datareturn;
        this.defaultList = res.datareturn;
        this.dataSource = new MatTableDataSource(this.publishList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }
  sortChange(sortState: Sort | any) {}
  onDownload(a: any) {
    console.log(a);
  }

  onChange(value: DataReturn) {
    this.mainApiservice
      .updatePublishStatus(value.apiId, value.status)
      .subscribe({
        next: () => {
          this.refresh();
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
  onView(row: DataReturn) {
    this.router.navigate(['/data-service-detail/' + row.apiId]);
  }
  onSearch() {
    this.dataSource.data = (
      JSON.parse(JSON.stringify(this.defaultList)) as DataReturn[]
    ).filter((a) => a.apiName.includes(this.form.value));
  }
  getLabel(a: string) {
    return this.statusList.find((stat) => stat.value === a)?.label;
  }
  getIcon(a: string) {
    return this.statusList.find((stat) => stat.value === a)?.icon;
  }
}
