import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  DefaultDialogComponent,
  DataManagementDataSetFormComponent,
} from '@dpt/form';
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
} from '@dpt/shared';

@Component({
  selector: 'dpt-data-management-main',
  templateUrl: './data-management-main.component.html',
  styleUrls: ['./data-management-main.component.scss'],
})
export class DataManagementMainComponent implements AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  form = new FormControl();
  categoryForm = new FormControl();
  category: Category[] = [];

  displayedColumns: string[] = [
    'order',
    'dataName',
    'department',
    'dataList',
    'publishStatus',
    'action',
  ];
  currentData: DataReturn[] = [];
  defaultData: DataReturn[] = [];
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
    private userService: UserService
  ) {}
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.mainApiService.getCategory().subscribe((a: any) => {
      this.category = a.Category;
    });
    this.mainApiService.getPrivacy().subscribe((res) => {
      this.privacyList = res.Privacy;
    });
    this.mainApiService.getDataType().subscribe((res) => {
      this.dataTypeList = res.TypeData;
    });
    this.mainApiService.getCategoryGroup().subscribe((res) => {
      this.categoryGroupList = res.Groups;
    });
    this.mainApiService.getProvinces().subscribe((res) => {
      this.provinceList = res.Province;
    });
    this.mainApiService.getApiType().subscribe((res) => {
      this.apiTypeList = res.TypeData;
    });
    this.departmentId =
      this.userService.getUser()?.department.departmentId ?? '';
    this.refresh();
  }

  refresh() {
    this.mainApiService
      .getDataByDepartmentNew(this.departmentId)
      .subscribe((data) => {
        this.dataSource.data = data.datareturn;
        this.defaultData = data.datareturn;
      });
  }
  sortChange(sortState: Sort | any) {}
  onDownload(a: any) {}
  onDelete(apiId: number) {
    this.mainApiService
      .deleteApiData({
        apiId,
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

  onEdit(row: DataReturn) {
    const data = {
      ...row,
      dataTypeList: this.dataTypeList,
      privacyList: this.privacyList,
      categoryList: this.category,
      categoryGroupList: this.categoryGroupList,
      apiTypeList: this.apiTypeList,
      provinceList: this.provinceList,
      onConfirm: this.onEditDataConfirm.bind(this),
      isEdit: true,
    };

    const dialogRef = this.dialog.open(DataManagementDataSetFormComponent, {
      data,
      minWidth: '1000px',
    });
  }
  onAddItem() {
    const data = {
      dataTypeList: this.dataTypeList,
      privacyList: this.privacyList,
      categoryList: this.category,
      provinceList: this.provinceList,
      categoryGroupList: this.categoryGroupList,
      apiTypeList: this.apiTypeList,
      onConfirm: this.onAddDataConfirm.bind(this),
    };
    const dialogRef = this.dialog.open(DataManagementDataSetFormComponent, {
      data,
      minWidth: '1000px',
    });
  }
  onAddDataConfirm(form: InsertApiRequest) {
    form.zone = form.privacyId === '1' ? 'PB' : 'PV';
    form.typeId = form.typeId.toString();
    form.attribute = null;
    this.mainApiService.addApiData(form).subscribe({
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
  onEditDataConfirm(form: UpdateApiRequest) {
    form.zone = form.privacyId === '1' ? 'PB' : 'PV';
    form.typeId = form.typeId.toString();
    form.attribute = null;
    this.mainApiService.updateApiData(form).subscribe({
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
  onSearch() {
    this.currentData = (
      JSON.parse(JSON.stringify(this.defaultData)) as DataReturn[]
    ).filter((a) => {
      return (
        ((this.form.value as string)?.trim()
          ? a.apiName.includes(this.form.value)
          : true) &&
        (this.categoryForm ? a.catName === this.categoryForm.value : true)
      );
    });
    this.dataSource.data = this.currentData;
  }
}
