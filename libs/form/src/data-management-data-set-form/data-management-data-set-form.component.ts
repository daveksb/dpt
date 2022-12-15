import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MainApiService, UserService } from '@dpt/shared';
import { Base64 } from 'js-base64';
import {
  Category,
  CategoryGroup,
  CheckFileResponse,
  DataType,
  Privacy,
  Province,
} from 'libs/shared/src/lib/share.model';
import { DateTime } from 'luxon';
import { interval, Observable, takeUntil } from 'rxjs';
import { Subject } from 'rxjs';
export interface TableParam {
  name?: string;
  type?: string;
  description?: string;
  default?: string;
}
@Component({
  selector: 'dpt-data-management-data-set-form',
  templateUrl: './data-management-data-set-form.component.html',
  styleUrls: ['./data-management-data-set-form.component.scss'],
})
export class DataManagementDataSetFormComponent implements OnInit {
  formGroup = new FormGroup<any>({
    privacyId: new FormControl<any>(null, Validators.required),
    apiId: new FormControl<any>(null, Validators.required),
    apiName: new FormControl<any>(null, Validators.required),
    attribute: new FormControl<any>(null, Validators.required),
    active: new FormControl<any>('N', Validators.required),
    createBy: new FormControl<any>(
      this.userService.getUser()?.userId,
      Validators.required
    ),
    departmentId: new FormControl<any>(
      this.userService.getUser()?.department.departmentId,
      Validators.required
    ),
    typeId: new FormControl<any>(1, Validators.required),
    zone: new FormControl<any>(null, Validators.required),
    catId: new FormControl<any>(null, Validators.required),
    groupsId: new FormControl<any>(null, Validators.required),
    apiDetail: new FormControl<any>(null, Validators.required),
    apiLink: new FormControl<any>(null, Validators.required),
    formatType: new FormControl<any>('FILE', Validators.required),
    jsonField: new FormControl<any>(null, Validators.required),
    provinceCode: new FormControl<any>(null, Validators.required),
  });
  dataTypeList: DataType[] = [];
  jsonForm = new FormGroup({
    form: new FormArray([
      // new FormGroup({
      //   name: new FormControl<any>(null, Validators.required),
      //   type: new FormControl<any>(null, Validators.required),
      //   description: new FormControl<any>(null, Validators.required),
      //   default: new FormControl<any>(null, Validators.required),
      // }),
    ]),
  });
  generateRefId = '';
  privacyList: Privacy[] = [];
  categoryGroupList: CategoryGroup[] = [];
  categoryList: Category[] = [];
  provinceList: Province[] = [];
  displayedColumns = ['name', 'type', 'description', 'default', 'action'];
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
  cancelSubject$ = new Subject();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    private userService: UserService,
    private mainApiService: MainApiService
  ) {
    this.formGroup.get('active')?.disable(); // ToDo enable if admin department
    this.formGroup.patchValue(data);
    this.formGroup.get('typeId')?.setValue(data.tId);
    this.categoryList = data.categoryList;
    this.privacyList = data.privacyList;
    this.provinceList = data.provinceList;
    this.dataTypeList = data.dataTypeList;
    this.categoryGroupList = data.categoryGroupList;
    if (this.data.isEdit) {
      this.formGroup.get('typeId')?.disable();
    }
    if (this.data.jsonField) {
      const form = JSON.parse(
        Base64.decode((JSON.parse(atob(this.data.jsonField)) as any).data) ??
          '[]'
      ) as TableParam[];
      form.forEach((g) => {
        const newGroup = new FormGroup({
          name: new FormControl<any>(g.name),
          type: new FormControl<any>(g.type),
          description: new FormControl<any>(g.description),
          default: new FormControl<any>(g.default),
        });
        this.formArray.push(newGroup);
      });
      if (!this.isAPI) {
        this.formGroup.get('link')?.disable();
      } else {
        this.formGroup.get('link')?.enable();
      }
      // this.jsonForm
      //   .get('form')(this.jsonForm.get('form') as FormArray)
      //   .patchValue(JSON.parse(atob(this.data.jsonField) ?? '[]'));
    }

    // this.dataSource.data = this.jsonForm.controls;
  }
  // getForm(index: number, form: string) {
  // return this.jsonForm.at(index).get(form) as FormControl;
  // }

  get formArray() {
    return (this.jsonForm.get('form') as FormArray)
      .controls as AbstractControl[];
  }
  ngOnInit(): void {
    if (!this.data.refId) {
      this.getRefId();
    }
    this.formGroup.get('typeId')?.valueChanges.subscribe((res) => {
      if (!this.isAPI) {
        this.formGroup.get('link')?.disable();
      } else {
        this.formGroup.get('link')?.enable();
      }
    });
    const role = this.userService.getUser()?.role.roleId;
    if (role === '6' || role === '1') {
      this.formGroup.get('active')?.enable();
    }
  }

  onDismiss() {
    this.cancelSubject$.next(true);
    this.dialogRef.close();
  }
  onConfirm() {
    // this.formGroup.get('jsonField')?.setValue(null);
    if (this.jsonForm.get('form')?.value) {
      this.formGroup.get('jsonField')?.setValue(
        JSON.stringify({
          data: Base64.encode(JSON.stringify(this.jsonForm.get('form')?.value)),
        })
      );
    }

    this.formGroup
      .get('formatType')
      ?.setValue(
        this.formGroup.get('typeId')?.value?.toString() === '1' ? 'API' : 'FILE'
      );

    this.data.onConfirm(this.formGroup.getRawValue());
    this.onDismiss();
  }
  get isAPI() {
    return this.formGroup.get('typeId')?.value === '1';
  }
  get isEdit() {
    return this.data.isEdit;
  }
  addRow() {
    (this.jsonForm.get('form') as FormArray).push(
      new FormGroup({
        name: new FormControl<any>(null, Validators.required),
        type: new FormControl<any>(null, Validators.required),
        description: new FormControl<any>(null, Validators.required),
        default: new FormControl<any>(null, Validators.required),
      })
    );
  }
  deleteRow(i: number) {
    (this.jsonForm.get('form') as FormArray).removeAt(i);
  }

  addFile() {
    const temp = this.data.apiLink ?? '';
    const hasPrefix = (temp as string).includes('TA');
    if (hasPrefix) {
      this.generateRefId = (this.data.apiLink as string).split('.')[0];
    }
    if (!this.data.apiLink) {
      this.mainApiService
        .insertFileTemp({
          refId: this.generateRefId,
        })
        .subscribe((res) => {
          if (res.returnCode === '00') {
            const temp = interval(10000);
            temp.pipe(takeUntil(this.cancelSubject$)).subscribe(() => {
              this.mainApiService.selectFileTemp(this.generateRefId).subscribe({
                next: (select) => {
                  if (
                    select.returnCode === '99' ||
                    select.returnCode === '98'
                  ) {
                    this.cancelSubject$.next(true);
                  } else {
                    if (select.returnCode === '00') {
                      if (select.tfFileName) {
                        this.formGroup
                          .get('apiLink')
                          ?.setValue(select.tfFileName);
                        this.cancelSubject$.next(true);
                      }
                    }
                  }
                },
                error: () => {
                  this.cancelSubject$.next(true);
                },
              });
            });
            //
          } else console.log(res);
        });
    }

    window.open(
      'http://38.242.138.3/9A5387D3066CAD4D72E2B730A7456639E97E5C6D/uploadfiledata.php?refId=' +
        this.generateRefId,
      '_blank'
    );
  }
  getRefId() {
    this.generateRefId = `TA${this.userService.getUser()?.userId}${
      DateTime.now().second
    }${DateTime.now().minute}${DateTime.now().hour}${DateTime.now().day}${
      DateTime.now().month
    }${DateTime.now().year}`;
  }
}
