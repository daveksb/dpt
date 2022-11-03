import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { DataRequestFormComponent } from '@dpt/form';
import { MainApiService, UserService } from '@dpt/shared';
import {
  DataReturn,
  Department,
  Province,
  Zone,
} from 'libs/shared/src/lib/share.model';
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
  formGroup = new FormGroup({
    province: new FormControl<string[]>([]),
    zoneName: new FormControl<string[]>([]),
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
    this.canRequest =
      this.userService.getUser()?.role.accessControl.accReq === 'T';
    if (this.userService.isUserInternal()) {
      this.mainApiService.getPrivateDataList().subscribe({
        next: (res) => {
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
        ((this.formGroup.get('province')?.value?.length ?? 0) > 0
          ? this.formGroup
              .get('province')
              ?.value?.some((r) => r === a.provinceCode)
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
