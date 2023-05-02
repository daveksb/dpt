import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataRequestFormComponent, DefaultDialogComponent } from '@dpt/form';
import { MainApiService, UserService } from '@dpt/shared';
import { DataReturn } from '@dpt/shared';
import { Router } from '@angular/router';
@Component({
  selector: 'dpt-data-publish',
  templateUrl: './data-publish.component.html',
  styleUrls: ['./data-publish.component.scss'],
  providers: [MatPaginatorModule],
})
export class DataPublishComponent implements OnInit, AfterViewInit {
  @ViewChild('publishRef') publishRef!: ElementRef<HTMLDivElement>;
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
      label: 'เปิดใช้งาน',
      value: 'Y',
      icon: 'activate',
    },

    {
      label: 'ไม่เปิดใช้งาน',
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
    private router: Router,
    private userService: UserService
  ) {}
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.refresh();
  }
  refresh() {
    const depId = this.userService.getUser()?.department.departmentId;
    //1 = admin
    //5 = owner
    //6 = owner admin
    // fix code due to req
    const role = this.userService.getUser()?.role.roleId;
    if (role === '1') {
      this.mainApiservice.getPublishList().subscribe((res) => {
        if (res.returnCode === '00') {
          this.publishList = res.datareturn;
          this.defaultList = res.datareturn;
          this.dataSource = new MatTableDataSource(this.publishList);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      });
    } else {
      this.mainApiservice.getPublishList(depId).subscribe((res) => {
        if (res.returnCode === '00') {
          this.publishList = res.datareturn;
          this.defaultList = res.datareturn;
          this.dataSource = new MatTableDataSource(this.publishList);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      });
    }
  }
  sortChange(sort: Sort | any) {
    const data = this.publishList.slice();
    if (!sort.active || sort.direction === '') {
      this.publishList = data;
      this.dataSource.data = this.publishList;
      return;
    }
    this.publishList = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'dataName':
          return this.compare(a.apiName, b.apiName, isAsc);
        case 'dataList':
          return this.compare(a.formatType, b.formatType, isAsc);
        case 'department':
          return this.compare(a.departmentName, b.departmentName, isAsc);
        case 'status':
          return this.compare(a.status, b.status, isAsc);
        default:
          return 0;
      }
    });
    this.dataSource.data = this.publishList;
  }
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  onDownload(a: any) {
    // console.log(a);
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
  pageChange(page: any) {
    if (page.previousPageIndex !== page?.pageIndex) {
      this.publishRef.nativeElement.scrollIntoView();
    }
  }
}
