import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FileHistory, MainApiService, UserService } from '@dpt/shared';
import { DataServiceDialogComponent, DefaultDialogComponent } from '@dpt/form';
import { DomSanitizer } from '@angular/platform-browser';
import { DataServiceDetail } from '@dpt/shared';
import { atob, Base64 } from 'js-base64';
import { ConfirmDialogComponent } from 'libs/form/src/confirm-dialog/confirm-dialog.component';

export interface DataService {
  topic: string;
  category: string;
  department: string;
  dataList: DataList[];
  view: number;
  detail1: string;
  detail2: string;
  api: Api;
}
export interface DataList {
  dataType: string;
  dataId: number;
  dataLink: string;
}
export interface Api {
  apiUrl: string;
  apiParams: ApiParam[];
  connectionString: string;
  dataRequestExample: string;
  javascriptExample: string;
}
export interface ApiParam {
  name: string;
  type: string;
  description: string;
  default: string;
}

@Component({
  selector: 'dpt-data-service-detail',
  templateUrl: './data-service-detail.component.html',
  styleUrls: ['./data-service-detail.component.scss'],
})
export class DataServiceDetailComponent implements OnInit {
  apiList = ['api', 'wps', 'wfs', 'wms'];
  apiDetail: DataServiceDetail | null = null;
  displayedColumns: string[] = ['name', 'type', 'description', 'default'];
  dataSource = new MatTableDataSource();
  displayedHistoryColumns = ['order', 'fileName', 'timestamp', 'action'];
  dataSourceHistory = new MatTableDataSource<FileHistory>();
  displayedZipColumns: string[] = ['name', 'size'];
  dataSourceZip = new MatTableDataSource<any>();
  mainUrl =
    'https://dptdata.dpt.go.th/dptservice/dptapiaccess.php?filetokenkey=';
  tempDetail = '';
  fileSize = '';
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private userService: UserService,
    private mainApiService: MainApiService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}
  ngOnInit(): void {
    const apiId = this.route.snapshot.params['id'];
    const userId = this.userService.getUser()?.userId ?? '';
    this.mainApiService.getSelectHistoryfile(apiId).subscribe((res) => {
      this.dataSourceHistory = new MatTableDataSource(res.datareturn);
    });
    this.mainApiService.getDataServiceDetail(apiId, userId).subscribe({
      next: (res) => {
        if (res.returnCode === '00' || res.returnCode === '01') {
          const { returnCode, returnMessage, ...rest } = res;
          if (rest.picture) {
            const base64String = atob(rest.picture);
            rest.tempPicture =
              this.sanitizer.bypassSecurityTrustResourceUrl(base64String);
          }

          this.apiDetail = rest;
          if (this.apiDetail.tType === 'zip') {
            try {
              const a = JSON.parse(
                Base64.decode(this.apiDetail.jsonField)
              )?.data;
              const b = a.replace(/\n/g, '');
              const c = JSON.parse(Base64.decode(b));
              const newList = (c as any[])?.map((data) => {
                return {
                  name: data['ชื่อไฟล์'],
                  size: data['ขนาดไฟล์'],
                };
              });
              this.fileSize = newList.shift()?.size;
              this.dataSourceZip.data = newList;
            } catch {
              this.dataSourceZip.data = [];
            }
            try {
              this.tempDetail =
                JSON.parse(Base64.decode(res.jsonField))?.detail ?? '';
            } catch {
              this.tempDetail = '';
            }
          } else {
            try {
              const data = JSON.parse(Base64.decode(res.jsonField))?.data;
              this.dataSource = new MatTableDataSource(data);
              try {
                this.tempDetail =
                  JSON.parse(Base64.decode(res.jsonField))?.detail ?? '';
              } catch {
                this.tempDetail = '';
              }
            } catch {
              this.dataSource.data = [];
            }
          }
        } else {
          const ref = this.dialog.open(DefaultDialogComponent, {
            maxHeight: '800px',
            width: '500px',
            data: {
              isError: true,
              status: 'ดำเนินการไม่สำเร็จ',
            },
          });
          ref.afterClosed().subscribe(() => {
            this.router.navigate(['/data-service-list']);
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
  onDownload(apiId: string, fileName: string) {
    window.open(
      'https://dptdata.dpt.go.th/dptservice/dptgethistoryfile.php?filename=' +
        fileName,
      '_blank'
    );
  }
  toApiList() {
    this.router.navigate(['/data-service-list']);
  }
  toApiListWithCategory() {
    this.router.navigate(['/data-service-list'], {
      queryParams: {
        category: this.apiDetail?.catName ?? '',
      },
    });
  }
  get getLink() {
    return this.apiDetail?.apiLink
      ? this.sanitizer.bypassSecurityTrustResourceUrl(
          this.apiDetail.apiLink ?? ''
        )
      : '';
  }
  onShowExampleData() {
    const body = {
      userId: this.userService.getUser()?.userId,
      apiId: this.apiDetail?.apiId,
      countdatetemp: '365',
      countdate: '365',
      zone: this.apiDetail?.zone,
    };
    let token = '';
    this.mainApiService.getTokenPublic(body).subscribe((res) => {
      if (res.returnCode === '01') {
        token = res.tokenKey;
        this.dialog.open(DataServiceDialogComponent, {
          width: '500px',
          data: {
            tokenKey: token,
          },
        });
      }
      if (res.returnCode === '00') {
        this.dialog.closeAll();
        this.dialog.open(DefaultDialogComponent, {
          maxHeight: '800px',
          width: '500px',
          data: {
            status: 'รอให้เจ้าของข้อมูลอนุมัติ',
          },
        });
      }
      if (res.returnCode === '98') {
        this.dialog.closeAll();
        this.dialog.open(DefaultDialogComponent, {
          maxHeight: '800px',
          width: '500px',
          data: {
            isError: true,
            status: 'มีข้อมูลที่ร้องขอแล้ว',
          },
        });
      }
    });
  }
  onRequestData() {
    const data = {
      onConfirm: this.onConfirm.bind(this),
      title: 'ยืนยันการขอใช้ข้อมูล',
      message: 'ยืนยันการขอใช้ข้อมูล' + this.apiDetail?.apiDetail,
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data,
      maxHeight: '800px',
      width: '500px',
    });
  }

  onConfirm() {
    const body = {
      userId: this.userService.getUser()?.userId,
      apiId: this.apiDetail?.apiId,
      countdatetemp: '365',
      countdate: '365',
      zone: this.apiDetail?.zone,
    };
    let token = '';
    this.mainApiService.getTokenPublic(body).subscribe({
      next: (res) => {
        if (res.returnCode === '01') {
          token = res.tokenKey;
          if (this.apiDetail) {
            this.apiDetail.tokenKey = res.tokenKey;
          }
          this.dialog.open(DataServiceDialogComponent, {
            width: '500px',
            data: {
              tokenKey: token,
            },
          });
        }
        if (res.returnCode === '00') {
          this.dialog.closeAll();
          this.dialog.open(DefaultDialogComponent, {
            maxHeight: '800px',
            width: '500px',
            data: {
              status: 'รอให้เจ้าของข้อมูลอนุมัติ',
            },
          });
        }
        if (res.returnCode === '98') {
          this.dialog.closeAll();
          this.dialog.open(DefaultDialogComponent, {
            maxHeight: '800px',
            width: '500px',
            data: {
              isError: true,
              status: 'มีข้อมูลที่ร้องขอแล้ว',
            },
          });
        }
      },
      error: () => {
        this.dialog.closeAll();
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
  back() {
    window.history.back();
  }
  copy() {
    navigator.clipboard.writeText(this.apiDetail?.apiLink ?? '');
  }
  onClickFile(fileType: string) {
    if (!this.apiList.some((a) => a === fileType) && this.apiDetail?.tokenKey) {
      window.open(this.mainUrl + this.apiDetail.tokenKey, '_blank');
    }
  }
  isShowDownload() {
    return (
      !this.apiList.some((a) => a === this.apiDetail?.tType) &&
      this.apiDetail?.tokenKey
    );
  }
}
