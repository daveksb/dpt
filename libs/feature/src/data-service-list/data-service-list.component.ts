import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { DataRequestFormComponent } from '@dpt/form';
import { MainApiService, UserService } from '@dpt/shared';
import { DataReturn, Department } from 'libs/shared/src/lib/share.model';
export interface Category {
  value: string;
  count: 10;
}
@Component({
  selector: 'dpt-data-service-list',
  templateUrl: './data-service-list.component.html',
  styleUrls: ['./data-service-list.component.scss'],
})
export class DataServiceListComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  form = new FormControl();
  selectForm = new FormControl();
  sideBarList: Category[] = [];
  displayedColumns: string[] = [
    'order',
    'fullName',
    'department',
    'userName',
    'dataName',
    'action',
  ];

  currentData: DataReturn[] = [];
  defaultData: DataReturn[] = [];
  departmentList: Department[] = [];
  currentCategory = '';
  constructor(
    private dialog: MatDialog,
    private route: Router,
    private mainApiService: MainApiService,
    private userService: UserService
  ) {}

  onClickFilterCategory(value: string) {
    if (value === this.currentCategory) {
      this.currentCategory = '';
      this.onSearch();
    } else {
      this.currentCategory = value;
      this.onSearch();
    }
  }

  onOpenFile(a: any) {}
  ngOnInit(): void {
    this.mainApiService.getDepartment().subscribe((a) => {
      this.departmentList = a.Department as Department[];
    });
    if (this.userService.isUserInternal()) {
      this.mainApiService.getPrivateDataList().subscribe({
        next: (res) => {
          console.log(res);
          if (res.returnCode === '00') {
            // to do
            //         this.currentTempData = res.datareturn;
            this.defaultData = res.datareturn as DataReturn[];
            this.currentData = res.datareturn as DataReturn[];
            this.sideBarList = [];
            const tempList: any = {};
            (res.datareturn as DataReturn[]).forEach((a) => {
              if (tempList[a.catName]) {
                tempList[a.catName]++;
              } else {
                tempList[a.catName] = 1;
              }
            });
            for (const key in tempList) {
              if (Object.prototype.hasOwnProperty.call(tempList, key)) {
                this.sideBarList.push({
                  value: key,
                  count: tempList[key],
                });
              }
            }
          } else {
          }
        },
        error: (err) => {},
      });
    } else {
      this.mainApiService.getPublicDataList().subscribe({
        next: (res) => {
          console.log(res);
          if (res.returnCode === '00') {
            // to do
            //         this.currentTempData = res.datareturn;
            this.defaultData = res.datareturn as DataReturn[];
            this.currentData = res.datareturn as DataReturn[];
            this.sideBarList = [];
            const tempList: any = {};
            (res.datareturn as DataReturn[]).forEach((a) => {
              if (tempList[a.catName]) {
                tempList[a.catName]++;
              } else {
                tempList[a.catName] = 1;
              }
            });
            for (const key in tempList) {
              if (Object.prototype.hasOwnProperty.call(tempList, key)) {
                this.sideBarList.push({
                  value: key,
                  count: tempList[key],
                });
              }
            }
          } else {
          }
        },
        error: (err) => {},
      });
    }
  }
  sortChange(sortState: Sort | any) {}
  onSearch() {
    this.currentData = (
      JSON.parse(JSON.stringify(this.defaultData)) as DataReturn[]
    ).filter((a) => {
      return (
        ((this.form.value as string)?.trim()
          ? a.apiName.includes(this.form.value)
          : true) &&
        (this.selectForm.value
          ? a.departmentName === this.selectForm.value
          : true) &&
        (this.currentCategory ? a.catName === this.currentCategory : true)
      );
    });
  }
  onRequest() {
    this.route.navigate(['data-service-request']);
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
  onNavigateData(id: string) {
    this.route.navigate([`data-service-detail/${id}`]);
  }
}
