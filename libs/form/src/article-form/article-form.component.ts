import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Article, MainApiService, UserService } from '@dpt/shared';
import { Base64 } from 'js-base64';
import { DefaultDialogComponent } from '../default-dialog/default-dialog.component';
interface DPTFile {
  fileName: string;
  data: ArrayBuffer | null;
}
@Component({
  selector: 'dpt-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss'],
})
export class ArticleFormComponent implements OnInit {
  @ViewChild('fileRef') fileRef!: ElementRef<HTMLInputElement>;
  formGroup = new FormGroup({
    topic: new FormControl(),
    description: new FormControl(),
  });
  tempFile?: any;
  statusList = [
    {
      label: 'เปิด',
      value: 'Y',
    },
    {
      label: 'ปิด',
      value: 'N',
    },
  ];
  tid = '';
  isEdit = false;
  constructor(
    private route: Router,
    private activateRoute: ActivatedRoute,
    private mainService: MainApiService,
    private dialog: MatDialog,
    private userService: UserService
  ) {
    this.tid = activateRoute.snapshot.params['tid'];
    if (this.tid) {
      this.mainService.getArticleDetail(this.tid).subscribe((res) => {
        if (res.thumbnail) {
          const file: DPTFile = JSON.parse(
            Base64.decode(res.thumbnail)
          ) as DPTFile;
          if (file.data) {
            const newFile = new File([file?.data], file.fileName);
            res.tempThumbnail = newFile;
            this.tempFile = Base64.decode(res.thumbnail);
          }
        }
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(res.tempThumbnail);
        this.fileRef.nativeElement.files = dataTransfer.files;

        this.formGroup.get('topic')?.patchValue(res.topic);
        this.formGroup.get('description')?.patchValue(res.description);
      });
    }
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.tid) {
      const form = {
        tid: this.tid,
        topic: this.formGroup.value.topic,
        description: this.formGroup.value.description,
        thumbnail: this.tempFile
          ? Base64.encode(this.tempFile.toString())
          : null,
        userid: this.userService.getUser()?.userId,
      };
      this.mainService.editArticle(form).subscribe({
        next: (res) => {
          if (res.returnCode === '00') {
            this.dialog.open(DefaultDialogComponent, {
              maxHeight: '800px',
              width: '500px',
              data: {
                status: 'ดำเนินการสำเร็จ',
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
    } else {
      const form = {
        topic: this.formGroup.value.topic,
        description: this.formGroup.value.description,
        thumbnail: this.tempFile
          ? Base64.encode(this.tempFile.toString())
          : null,
        userid: this.userService.getUser()?.userId,
      };

      this.mainService.addArticle(form).subscribe({
        next: (res) => {
          if (res.returnCode === '00') {
            const dialog = this.dialog.open(DefaultDialogComponent, {
              maxHeight: '800px',
              width: '500px',
              data: {
                status: 'ดำเนินการสำเร็จ',
              },
            });
            dialog.afterClosed().subscribe((res) => {
              this.route.navigate(['article']);
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
  onFileChange(a: any) {
    const file = a.target?.files[0] as File;
    if (file && file.size > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.tempFile = JSON.stringify({
          fileName: file.name,
          data: reader.result,
        });
      };
      reader.onerror = (error) => {
        console.log('Error: ', error);
      };
    }
  }
}
