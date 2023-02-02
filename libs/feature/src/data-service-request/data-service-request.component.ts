import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DefaultDialogComponent } from '@dpt/form';
import { MainApiService, UserService } from '@dpt/shared';
import { Category } from '@dpt/shared';
import { DateTime } from 'luxon';
export interface TempFile {
  file: File;
  status: string;
}

@Component({
  selector: 'dpt-data-service-request',
  templateUrl: './data-service-request.component.html',
  styleUrls: ['./data-service-request.component.scss'],
})
export class DataServiceRequestComponent implements OnInit {
  formGroup = new FormGroup({
    departmentId: new FormControl(null, Validators.required),
    categoryId: new FormControl(null, Validators.required),
    requestDetail: new FormControl(null, Validators.required),
    requestName: new FormControl(null, Validators.required),
    rfdata: new FormControl<FileList | null>(null, Validators.required),
  });
  category: Category[] = [];
  tempFile: TempFile[] = [];
  rftrans = '';
  isPrivate = false;
  constructor(
    private apiService: MainApiService,
    private userService: UserService,
    private dialog: MatDialog
  ) {}
  get rfdata() {
    return this.formGroup.get('rfdata')?.getRawValue() as FileList;
  }
  ngOnInit(): void {
    this.apiService.getCategory().subscribe((a) => {
      this.category = a.Category;
    });
    this.rftrans = `TR${this.userService.getUser()?.userId}${
      DateTime.now().minute
    }${DateTime.now().hour}${DateTime.now().day}${DateTime.now().month}${
      DateTime.now().year
    }`;
  }

  onFileChange(a: any) {
    const file = a.target?.files[0] as File;
    if (file && file.size > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const currentFile = {
          file: file,
          status: 'LOADING',
        };
        this.tempFile.push(currentFile);
        this.apiService
          .uploadFile({
            rfname: file.name,
            rfmime: file.type,
            rfdata: btoa(reader.result as string),
            rftrans: this.rftrans,
            rfusrid: this.userService.getUser()?.userId,
          })
          .subscribe({
            next: (res) => {
              if (res?.returnCode === '00') {
                currentFile.status = 'DONE';
              } else {
                currentFile.status = 'FAILED';
              }
            },
            error: () => {
              currentFile.status = 'FAILED';
            },
          });
      };
      reader.onerror = (error) => {
        console.log('Error: ', error);
      };
    }
  }
  deleteFile(file: TempFile) {
    file.status = 'LOADING';
    this.apiService
      .deleteFile({
        rfname: file.file.name,
        rftrans: this.rftrans,
        rfusrid: this.userService.getUser()?.userId,
      })
      .subscribe({
        next: (res) => {
          if (res.returnCode === '00') {
            const i = this.tempFile.findIndex(
              (a) => a.file.name === file.file.name
            );
            this.tempFile.splice(i, 1);
            this.dialog.open(DefaultDialogComponent, {
              maxHeight: '800px',
              width: '500px',
              data: {
                status: 'ดำเนินการสำเร็จ',
              },
            });
          } else {
            this.dialog.open(DefaultDialogComponent, {
              maxHeight: '800px',
              width: '500px',
              data: {
                isError: true,
                status: 'ดำเนินการไม่สำเร็จ',
              },
            });
          }
          file.status = 'DONE';
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
          file.status = 'DONE';
        },
      });
  }

  onConfirm() {
    const user = this.userService.getUser();
    if (user) {
      this.apiService
        .addRequestApi({
          userId: user?.userId,
          departmentId: user?.departmentExternal
            ? '0'
            : user?.department?.departmentId,
          categoryId: user?.departmentExternal ? '1' : '0',
          requestName: this.formGroup?.value?.requestName ?? '',
          requestDetail: this.formGroup?.value?.requestName ?? '',
          refId: this.rftrans,
          assignId: 'sec',
          zone: user.departmentExternal ? 'PB' : 'PV',
          apiId: null,
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
            } else {
              this.dialog.open(DefaultDialogComponent, {
                maxHeight: '800px',
                width: '500px',
                data: {
                  isError: true,
                  status: 'ดำเนินการไม่สำเร็จ',
                },
              });
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
  }

  back() {
    window.history.back();
  }
}
