import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MainApiService,
  RequestApiFile,
  RequestApiFileResponse,
} from '@dpt/shared';
import { saveAs } from 'file-saver';

@Component({
  selector: 'dpt-file-list-form',
  templateUrl: './file-list-form.component.html',
  styleUrls: ['./file-list-form.component.scss'],
})
export class FileListFormComponent implements OnInit {
  fileList: RequestApiFile[] = [];
  formGroup = new FormGroup({
    reqDescription: new FormControl(),
    reqName: new FormControl(),
    departmentName: new FormControl(),
    catName: new FormControl(),
    name: new FormControl(),
    lname: new FormControl(),
  });
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    private mainApiService: MainApiService
  ) {
    this.fileList = data.fileList;
  }

  ngOnInit(): void {}

  onDismiss() {
    this.dialogRef.close();
  }
  downloadFile(id: string) {
    this.mainApiService.getRequestApiFileView(id).subscribe((res) => {
      if (res.returnCode === '00') {
        const link = document.createElement('a');
        link.href = atob(res.rfData);
        link.download = res.rfName;
        link.click();
        link.remove();
      }
    });
  }
}
