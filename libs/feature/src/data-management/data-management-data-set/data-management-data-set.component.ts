import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataManagementDataSetFormComponent } from '@dpt/form';
import { MainApiService, UserService } from '@dpt/shared';
import {
  Category,
  CategoryGroup,
  DataReturn,
  DataType,
  Department,
  InsertApiRequest,
  Privacy,
} from 'libs/shared/src/lib/share.model';

@Component({
  selector: 'dpt-data-management-data-set',
  templateUrl: './data-management-data-set.component.html',
  styleUrls: ['./data-management-data-set.component.scss'],
})
export class DataManagementDataSetComponent implements AfterViewInit {
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
    this.departmentId =
      this.userService.getUser()?.department.departmentId ?? '';
    this.refresh();
  }

  refresh() {
    this.mainApiService
      .getDataByDepartment(this.departmentId)
      .subscribe((data) => {
        this.dataSource.data = data.datareturn;
        this.defaultData = data.datareturn;
        // this.onSearch();
      });
  }
  sortChange(sortState: Sort | any) {}
  onDownload(a: any) {
    console.log(a);
  }
  onDelete(id: number) {
    console.log('onDelete', id);
  }

  onEdit(row: DataReturn) {
    const data = {
      ...row,
      dataTypeList: this.dataTypeList,
      privacyList: this.privacyList,
      categoryList: this.category,
      categoryGroupList: this.categoryGroupList,
      onConfirm: this.onAddDataConfirm.bind(this),
      isEdit: true,
    };

    const dialogRef = this.dialog.open(DataManagementDataSetFormComponent, {
      data,
      width: '1000px',
    });
  }
  onAddItem() {
    const data = {
      onConfirm: this.onAddDataConfirm.bind(this),
    };
    const dialogRef = this.dialog.open(DataManagementDataSetFormComponent, {
      data,
      width: '1000px',
    });
  }
  onAddDataConfirm(form: InsertApiRequest) {
    console.log(form);
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
