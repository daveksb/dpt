import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MainApiService, UserService } from '@dpt/shared';
import { DataServiceDialogComponent, DefaultDialogComponent } from '@dpt/form';
import { DomSanitizer } from '@angular/platform-browser';
import { DataServiceDetail } from 'libs/shared/src/lib/share.model';
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
  data: DataService = {
    topic: 'กฎกระทรวงผังเมืองรวมจังหวัด',
    category: 'การจำแนกการใช้ที่ดิน',
    department: 'สำนักผังประเทศและผังภาค',
    dataList: [
      {
        dataType: 'CSV',
        dataId: 11,
        dataLink: 'test',
      },
      {
        dataType: 'PDF',
        dataId: 12,
        dataLink: 'test',
      },
    ],
    view: 10,
    detail1: 'test',
    detail2: 'test',
    api: {
      apiUrl: 'test',
      apiParams: [
        {
          name: 'test',
          type: 'test',
          description: 'test',
          default: 'test',
        },
        {
          name: 'test',
          type: 'test',
          description: 'test',
          default: 'test',
        },
        {
          name: 'test',
          type: 'test',
          description: 'test',
          default: 'test',
        },
        {
          name: 'test',
          type: 'test',
          description: 'test',
          default: 'test',
        },
        {
          name: 'test',
          type: 'test',
          description: 'test',
          default: 'test',
        },
        {
          name: 'test',
          type: 'test',
          description: 'test',
          default: 'test',
        },
        {
          name: 'test',
          type: 'test',
          description: 'test',
          default: 'test',
        },
      ],

      connectionString: 'test',
      dataRequestExample: 'test',
      javascriptExample: 'test',
    },
  };
  // apiParams = [
  //   {
  //     name: 'test1',
  //     type: 'test',
  //     description: 'test',
  //     default: 'test',
  //   },
  //   {
  //     name: 'test',
  //     type: 'test',
  //     description: 'test',
  //     default: 'test',
  //   },
  //   {
  //     name: 'test',
  //     type: 'test',
  //     description: 'test',
  //     default: 'test',
  //   },
  //   {
  //     name: 'test',
  //     type: 'test',
  //     description: 'test',
  //     default: 'test',
  //   },
  //   {
  //     name: 'test',
  //     type: 'test',
  //     description: 'test',
  //     default: 'test',
  //   },
  //   {
  //     name: 'test',
  //     type: 'test',
  //     description: 'test',
  //     default: 'test',
  //   },
  //   {
  //     name: 'test',
  //     type: 'test',
  //     description: 'test',
  //     default: 'test',
  //   },
  // ];
  apiDetail: DataServiceDetail | null = null;
  displayedColumns: string[] = ['name', 'type', 'description', 'default'];
  dataSource = new MatTableDataSource(this.data.api.apiParams);

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private userService: UserService,
    private mainApiService: MainApiService,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    const apiId = this.route.snapshot.params['id'];
    this.mainApiService.getDataServiceDetail(apiId).subscribe({
      next: (res) => {
        if (res.returnCode === '00' || res.returnCode === '01') {
          //
          const { returnCode, returnMessage, ...rest } = res;
          if (rest.picture) {
            const base64String = atob(rest.picture);
            rest.tempPicture =
              this.sanitizer.bypassSecurityTrustResourceUrl(base64String);
          }
          this.apiDetail = rest;
          this.dataSource = new MatTableDataSource(
            JSON.parse(atob(res.jsonField))
          );
          // this.dataSource = new MatTableDataSource(this.apiParams);
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

    // this.router.navigate(['data-service-request']);
  }
  onRequestData() {
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
}
