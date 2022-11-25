import { Component, Inject, OnInit } from '@angular/core';
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
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    private mainApiService: MainApiService
  ) {
    this.fileList = data;
  }

  ngOnInit(): void {}

  onDismiss() {
    this.dialogRef.close();
  }
  downloadFile(id: string) {
    this.mainApiService.getRequestApiFileView(id).subscribe((res) => {
      if (res.returnCode === '00') {
        const blob = new Blob([atob(res.rfData)], {
          type: res.rfMime,
        });
        saveAs(blob, res.rfName);
        console.log(res.rfData);
      }
    });
  }
}
