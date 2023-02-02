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
} from '@dpt/shared';
import { DateTime } from 'luxon';
import { interval, takeUntil } from 'rxjs';
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
    status: new FormControl<any>('N', Validators.required),
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
    createInfoDate: new FormControl<Date>(new Date(), Validators.required),
    picture: new FormControl<any>(null, Validators.required),
    tempPicture: new FormControl<any>(null, Validators.required),
    tempDetail: new FormControl<any>(null, Validators.required),
    tempFile: new FormControl<any>(null, Validators.required),
  });
  dataTypeList: DataType[] = [];
  jsonForm = new FormGroup({
    form: new FormArray([]),
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
  apiList = ['1', '14', '15', '16'];
  cancelSubject$ = new Subject();
  hasFile = false;
  tempFile: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    private userService: UserService,
    private mainApiService: MainApiService
  ) {
    this.formGroup.get('status')?.disable(); // ToDo enable if admin department
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
      if (this.data.tType !== 'zip') {
        const form = JSON.parse(Base64.decode(this.data.jsonField) ?? '[]')
          ?.data as TableParam[];
        form.forEach((g) => {
          const newGroup = new FormGroup({
            name: new FormControl<any>(g.name),
            type: new FormControl<any>(g.type),
            description: new FormControl<any>(g.description),
            default: new FormControl<any>(g.default),
          });
          this.formArray.push(newGroup);
        });
      }
      if (this.apiList.some((a) => a === this.data.tId)) {
        const form = JSON.parse(
          Base64.decode(this.data.jsonField) ?? '[]'
        ).detail;
        this.formGroup.get('tempDetail')?.setValue(form);
      }

      if (!this.isAPI) {
        this.formGroup.get('link')?.disable();
      } else {
        this.formGroup.get('link')?.enable();
      }
    }
    const temp = this.data.apiLink ?? '';
    const hasPrefix = (temp as string).includes('TA');
    if (hasPrefix) {
      this.generateRefId = (this.data.apiLink as string).split('.')[0];
    }
    this.hasFile = !!this.generateRefId;
  }

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
      this.formGroup.get('status')?.enable();
    }
  }

  onDismiss() {
    this.cancelSubject$.next(true);
    this.dialogRef.close();
  }
  onConfirm() {
    if (
      this.jsonForm.get('form')?.value &&
      this.formGroup.get('typeId')?.value?.toString() !== '10'
    ) {
      this.formGroup.get('jsonField')?.setValue(
        Base64.encode(
          JSON.stringify({
            data: this.jsonForm.get('form')?.value,
            detail: this.formGroup.get('tempDetail')?.value,
          })
        )
      );
    }
    if (this.formGroup.get('typeId')?.value?.toString() === '10') {
      // JSON THAI
      if (!this.hasFile) {
        this.formGroup.get('jsonField')?.setValue(
          Base64.encode(
            JSON.stringify({
              data: this.formGroup.get('tempFile')?.value,
              detail: this.formGroup.get('tempDetail')?.value,
            })
          )
        );
      } else {
        // JSON ENCODE
        this.formGroup.get('jsonField')?.setValue(
          Base64.encode(
            JSON.stringify({
              data: this.formGroup.get('tempFile')?.value,
              detail: this.formGroup.get('tempDetail')?.value,
            })
          )
        );
      }
    }

    this.formGroup
      .get('formatType')
      ?.setValue(
        this.apiList.some(
          (a) => this.formGroup.get('typeId')?.value?.toString() === a
        )
          ? 'API'
          : 'FILE'
      );
    this.formGroup.get('picture')?.setValue(this.tempFile);
    const date = DateTime.fromJSDate(
      this.formGroup.get('createInfoDate')?.value
    ).toISODate({ format: 'basic' });

    this.formGroup.get('createInfoDate')?.setValue(date);
    this.formGroup.get('active')?.setValue(this.formGroup.get('status')?.value);

    const { tempPicture, status, tempFile, tempDetail, ...res } =
      this.formGroup.getRawValue();
    this.data.onConfirm(res);
    this.onDismiss();
  }
  onFileChange(a: any) {
    const file = a.target?.files[0] as File;
    if (file && file.size > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.tempFile = btoa(reader.result as string);
      };
      reader.onerror = (error) => {
        console.log('Error: ', error);
      };
    }
  }
  get isAPI() {
    return this.apiList.some((r) => this.formGroup.get('typeId')?.value === r);
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
      this.generateRefId = (this.data.apiLink as string)
        ? (this.data.apiLink as string)?.split('.')[0]
        : '';
    }
    this.mainApiService
      .insertFileTemp({
        refId: this.generateRefId,
      })
      .subscribe((res) => {
        const temp = interval(10000);
        temp.pipe(takeUntil(this.cancelSubject$)).subscribe(() => {
          this.mainApiService.selectFileTemp(this.generateRefId).subscribe({
            next: (select) => {
              if (select.returnCode === '99' || select.returnCode === '98') {
                this.hasFile = false;
                this.cancelSubject$.next(true);
              } else {
                if (select.returnCode === '00') {
                  if (select.tfFileName) {
                    this.formGroup.get('apiLink')?.setValue(select.tfFileName);
                    this.hasFile = true;
                    const name = select.tfFileName.split('.');
                    if (name[name.length - 1] === 'zip') {
                      select.tfZipB64 = select.tfZipB64.replace(/\n/g, '');
                      // const base64 = Base64.decode(select.tfZipB64 ?? '');
                      this.formGroup.get('tempFile')?.setValue(select.tfZipB64);
                    }

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
      });

    window.open(
      'https://cockpit.dpt.go.th/9A5387D3066CAD4D72E2B730A7456639E97E5C6D/uploadfiledata.php?refId=' +
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
