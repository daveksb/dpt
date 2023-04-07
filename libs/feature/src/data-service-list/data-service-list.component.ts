import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DataRequestFormComponent } from '@dpt/form';
import { MainApiService, UserService } from '@dpt/shared';
import { DataReturn, DataType, Department, Province, Zone } from '@dpt/shared';
export interface Category {
  value: string;
  count: 10;
}
export interface SortParam {
  value: string;
  label: string;
  direction: string;
}
@Component({
  selector: 'dpt-data-service-list',
  templateUrl: './data-service-list.component.html',
  styleUrls: ['./data-service-list.component.scss'],
})
export class DataServiceListComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  totalSize = 0;
  form = new FormControl();
  selectForm = new FormControl();
  sortList: SortParam[] = [
    {
      value: 'name',
      label: 'ชื่อ',
      direction: 'asc',
    },
    {
      value: 'name',
      label: 'ชื่อ',
      direction: 'desc',
    },
    {
      value: 'date',
      label: 'วันที่',
      direction: 'asc',
    },
    {
      value: 'date',
      label: 'วันที่',
      direction: 'desc',
    },
    {
      value: 'view',
      label: 'จำนวนเข้าชม',
      direction: 'asc',
    },
    {
      value: 'view',
      label: 'จำนวนเข้าชม',
      direction: 'desc',
    },
  ];
  sortListForm = new FormControl<SortParam>(this.sortList[3]);

  formGroup = new FormGroup({
    province: new FormControl<string[]>([]),
    zoneName: new FormControl<string[]>([]),
    dataType: new FormControl<string[]>([]),
  });
  sideBarList: Category[] = [];
  displayedColumns: string[] = [
    'order',
    'fullName',
    'department',
    'userName',
    'dataName',
    'action',
  ];
  canRequest = false;
  currentData: DataReturn[] = [];
  defaultData: DataReturn[] = [];
  departmentList: Department[] = [];
  currentCategory = '';
  mapCategory: any = {
    ผังเมือง: 'target.svg',
    พัฒนาเมือง: 'expand.svg',
    การอาคาร: 'file.svg',
    การช่าง: 'global.svg',
  };

  provinceList: Province[] = [];
  zones: Zone[] = [];
  currentProvinceList: Province[] = [];
  dataTypeList: DataType[] = [];
  constructor(
    private dialog: MatDialog,
    private route: Router,
    private mainApiService: MainApiService,
    private userService: UserService,
    private sanitizer: DomSanitizer
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
  onPaginationChange(change: PageEvent) {
    this.onSearch();
  }
  ngOnInit(): void {
    this.mainApiService.getDataType().subscribe((res) => {
      this.dataTypeList = res.TypeData;
    });
    this.formGroup.get('dataType')?.valueChanges.subscribe((v) => {
      this.onSearch();
    });
    this.formGroup.get('zoneName')?.valueChanges.subscribe((v) => {
      this.formGroup.get('province')?.reset();
      if (v && v?.length > 0) {
        this.currentProvinceList = this.provinceList.filter((a) =>
          v.some((p) => p === a.zoneName)
        );
        this.formGroup
          .get('province')
          ?.setValue(this.currentProvinceList.map((p) => p.provinceCode));
      } else {
        this.currentProvinceList = JSON.parse(
          JSON.stringify(this.provinceList)
        );
      }
    });
    this.formGroup.get('province')?.valueChanges.subscribe((c) => {
      this.onSearch();
    });
    this.mainApiService.getDepartment().subscribe((a) => {
      this.departmentList = a.Department as Department[];
    });
    this.mainApiService.getProvinces().subscribe((a) => {
      this.provinceList = a.Province.map((a) => {
        return {
          provinceCode: a.provinceCode.toString(),
          provinceName: a.provinceName,
          zoneName: a.zoneName,
        };
      });
      this.currentProvinceList = a.Province;
    });
    this.mainApiService.getZones().subscribe((a) => {
      this.zones = a.dbZoneNameOutput;
    });
    this.sortListForm.valueChanges.subscribe((res) => {
      this.onSearch();
    });
    this.canRequest =
      this.userService.getUser()?.role.accessControl.accReq === 'T';
    if (this.userService.isUserInternal()) {
      this.mainApiService.getPrivateDataList().subscribe({
        next: (res) => {
          if (res.returnCode === '00') {
            res.datareturn.sort(
              (a, b) =>
                new Date(b.createDate).getTime() -
                new Date(a.createDate).getTime()
            );
            res.datareturn.forEach((res) => {
              if (res.picture) {
                const base64String = atob(res.picture);
                res.tempPicture =
                  this.sanitizer.bypassSecurityTrustResourceUrl(base64String);
              }
            });
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
            this.onSearch();
          } else {
          }
        },
        error: (err) => {},
      });
    } else {
      this.mainApiService.getPublicDataList().subscribe({
        next: (res) => {
          if (res.returnCode === '00') {
            res.datareturn.sort(
              (a, b) =>
                new Date(b.createDate).getTime() -
                new Date(a.createDate).getTime()
            );
            res.datareturn.forEach((res) => {
              if (res.picture) {
                const base64String = atob(res.picture);
                res.tempPicture =
                  this.sanitizer.bypassSecurityTrustResourceUrl(base64String);
              }
            });
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
            this.onSearch();
          } else {
          }
        },
        error: (err) => {},
      });
    }
  }

  onSearch() {
    this.currentData = (this.defaultData as DataReturn[]).filter((a) => {
      return (
        ((this.form.value as string)?.trim()
          ? a.apiName.includes(this.form.value)
          : true) &&
        (this.selectForm.value
          ? a.departmentName === this.selectForm.value
          : true) &&
        ((this.formGroup.get('province')?.value?.length ?? 0) > 0
          ? this.formGroup
              .get('province')
              ?.value?.some((r) => r === a.provinceCode)
          : true) &&
        ((this.formGroup.get('dataType')?.value?.length ?? 0) > 0
          ? this.formGroup.get('dataType')?.value?.some((r) => r === a.tType)
          : true) &&
        (this.currentCategory ? a.catName === this.currentCategory : true)
      );
    });
    this.totalSize = this.currentData.length;
    this.currentData = this.currentData.sort((a, b) => {
      if (this.sortListForm?.value?.value === 'name') {
        if (a.apiName > b.apiName) {
          return this.sortListForm?.value?.direction === 'asc' ? -1 : 1;
        } else {
          return this.sortListForm?.value?.direction === 'asc' ? 1 : -1;
        }
      }
      if (this.sortListForm?.value?.value === 'date') {
        return this.sortListForm?.value?.direction === 'asc'
          ? new Date(a.createDate).getTime() - new Date(b.createDate).getTime()
          : new Date(b.createDate).getTime() - new Date(a.createDate).getTime();
      }
      if (this.sortListForm?.value?.value === 'view') {
        if (Number(a.countView) > Number(b.countView)) {
          return this.sortListForm?.value?.direction === 'asc' ? 1 : -1;
        } else {
          return this.sortListForm?.value?.direction === 'asc' ? -1 : 1;
        }
      }
      return 0;
    });
    this.currentData = this.currentData.filter(
      (a, i) =>
        i < this.paginator.pageSize * (this.paginator.pageIndex + 1) &&
        i >= this.paginator.pageSize * this.paginator.pageIndex
    );
  }
  onRequest() {
    this.route.navigate(['data-service-request']);
  }
  onView(id: number) {
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
