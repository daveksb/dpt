import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  DefaultDialogComponent,
  DataManagementDataSetFormComponent,
} from '@dpt/form';
import {
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
  Article,
} from '@dpt/shared';
import { Category } from '../data-service-list/data-service-list.component';

@Component({
  selector: 'dpt-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  form = new FormControl();
  categoryForm = new FormControl();
  category: Category[] = [];

  displayedColumns: string[] = [
    'order',
    'topic',
    'countview',
    'createby',
    'createdate',
    'action',
  ];
  currentData: Article[] = [];
  defaultData: Article[] = [];
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
    private route: Router
  ) {}
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.refresh();
  }

  refresh() {
    this.mainApiService.getArticle().subscribe((data) => {
      this.dataSource.data = data.datareturn;
      this.defaultData = data.datareturn;
    });
  }
  onDelete(tid: number) {
    this.mainApiService
      .deleteArticle({
        tid,
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

  onAddItem() {
    this.route.navigate(['article/add']);
    // this.mainApiService.addApiData(form).subscribe({
    //   next: (res) => {
    //     if (res.returnCode === '00') {
    //       this.dialog.open(DefaultDialogComponent, {
    //         maxHeight: '800px',
    //         width: '500px',
    //         data: {
    //           status: 'ดำเนินการสำเร็จ',
    //         },
    //       });
    //       this.refresh();
    //     }
    //   },
    //   error: () => {
    //     this.dialog.open(DefaultDialogComponent, {
    //       maxHeight: '800px',
    //       width: '500px',
    //       data: {
    //         isError: true,
    //         status: 'ดำเนินการไม่สำเร็จ',
    //       },
    //     });
    //   },
    // });
  }
  onEdit(article: Article) {
    this.route.navigate([`article/edit/${article.tid}`]);

    // this.mainApiService.updateApiData(form).subscribe({
    //   next: (res) => {
    //     if (res.returnCode === '00') {
    //       this.dialog.open(DefaultDialogComponent, {
    //         maxHeight: '800px',
    //         width: '500px',
    //         data: {
    //           status: 'ดำเนินการสำเร็จ',
    //         },
    //       });
    //       this.refresh();
    //     }
    //   },
    //   error: () => {
    //     this.dialog.open(DefaultDialogComponent, {
    //       maxHeight: '800px',
    //       width: '500px',
    //       data: {
    //         isError: true,
    //         status: 'ดำเนินการไม่สำเร็จ',
    //       },
    //     });
    //   },
    // });
  }
}
