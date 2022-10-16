import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MainApiService } from '@dpt/shared';
import {
  Category,
  CategoryGroup,
  DataType,
  InsertApiRequest,
  Privacy,
} from 'libs/shared/src/lib/share.model';

@Component({
  selector: 'dpt-data-management-data-set-form',
  templateUrl: './data-management-data-set-form.component.html',
  styleUrls: ['./data-management-data-set-form.component.scss'],
})
export class DataManagementDataSetFormComponent implements OnInit {
  formGroup = new FormGroup<any>({
    privacyId: new FormControl<string>('FILE'),
    apiName: new FormControl<any>(null, Validators.required),
    attribute: new FormControl<any>(null, Validators.required),
    active: new FormControl<any>('N', Validators.required),
    typeId: new FormControl<any>(null, Validators.required),
    zone: new FormControl<any>(null, Validators.required),
    catId: new FormControl<any>(null, Validators.required),
    groupsId: new FormControl<any>(null, Validators.required),
    apiDetail: new FormControl<any>(null, Validators.required),
    apiLink: new FormControl<any>(null, Validators.required),
    formatType: new FormControl<any>(null, Validators.required),
    jsonField: new FormControl<any>(null, Validators.required),
  });
  dataTypeList: DataType[] = [];

  privacyList: Privacy[] = [];
  categoryGroupList: CategoryGroup[] = [];
  categoryList: Category[] = [];

  statusList = [
    {
      label: 'ถูกใช้งาน',
      value: 'Y',
    },
    {
      label: 'ไม่ถูกใช้งาน',
      value: 'N',
    },
  ];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    private mainApiService: MainApiService
  ) {
    this.formGroup.patchValue(data);
    this.categoryList = data.categoryList;
    this.privacyList = data.privacyList;
    this.dataTypeList = data.dataTypeList;
    this.categoryGroupList = data.categoryGroupList;
  }

  ngOnInit(): void {}

  onDismiss() {
    this.dialogRef.close();
  }
  onConfirm() {
    this.data.onConfirm(this.formGroup);
    this.onDismiss();
  }
  get isAPI() {
    return this.formGroup.get('selectgroups')?.value === 'API';
  }
  get isEdit() {
    return this.data.isEdit;
  }
}
