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
  Article,
} from '@dpt/shared';
import { Category } from '../data-service-list/data-service-list.component';

@Component({
  selector: 'dpt-article-all',
  templateUrl: './article-all.component.html',
  styleUrls: ['./article-all.component.scss'],
})
export class ArticleAllComponent implements AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  form = new FormControl();
  categoryForm = new FormControl();
  category: Category[] = [];

  displayedColumns: string[] = ['order', 'topic', 'countview', 'createdate'];
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
  goToDetail(tid: string) {
    this.route.navigate([`article/${tid}`]);
  }

  refresh() {
    this.mainApiService.getArticle().subscribe((data) => {
      this.dataSource.data = data.datareturn;
      this.defaultData = data.datareturn;
    });
  }
}
