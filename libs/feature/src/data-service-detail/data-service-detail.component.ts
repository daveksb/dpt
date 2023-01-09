import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MainApiService, UserService } from '@dpt/shared';
import { DataServiceDialogComponent, DefaultDialogComponent } from '@dpt/form';
import { DomSanitizer } from '@angular/platform-browser';
import { DataServiceDetail } from 'libs/shared/src/lib/share.model';
import { atob, Base64 } from 'js-base64';

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
  displayedZipColumns: string[] = ['name', 'size'];
  dataSourceZip = new MatTableDataSource<any>();
  mainUrl = 'http://38.242.138.3/dpt/dptapiaccess.php?filetokenkey=';
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
    this.mainApiService.getDataServiceDetail(apiId, userId).subscribe({
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

          if (this.apiDetail.tType === 'zip') {
            const a = this.apiDetail.jsonField;
            const b = a.replace(/\n/g, '');
            const c = atob(b);
            const i = JSON.parse(c).data;
            const f = atob(i);
            const g = f.slice(1, -1);
            const h = g.replace(/\\n/g, '');
            const j = atob(h);
            const k = JSON.parse(j).data;
            const l = Base64.decode(k);
            const m = JSON.parse(l);
            const n = JSON.parse(m);
            // const data = JSON.parse(
            //   Base64.decode(res.jsonField.replace(/\n/g, ''))
            // )?.data;
            // console.log(data);
            // console.log(Base64.decode(res.jsonField.replace(/\n/g, '')));
            // console.log(Base64.decode(data).replace(/\n/g, ''));
            const newList = (n as any[])?.map((data) => {
              return {
                name: data['ชื่อไฟล์'],
                size: data['ขนาดไฟล์'],
              };
            });
            this.dataSourceZip.data = newList;
          } else {
            this.dataSource = new MatTableDataSource(
              JSON.parse(
                Base64.decode(
                  JSON.parse(Base64.decode(res.jsonField))?.data ?? ''
                )
              )
            );
          }
          // btoa((JSON.parse(atob(a)) as any).data);
          // const a =
          //   'eyJkYXRhIjoiSW1WNVNtdFpXRkpvU1dwdmFWTlhlREJPTVdoRVZFZGtNVk5ZU201a1ZYaHRXak5X\nV21GdFpERlRlazV1WkZac1ZWb3pWa3RNTW1ReFV6Rm9ibVJXYkRSWk1HeHhZMGRPU21Kc1NuTmNi\nbGw2VGxKYU1IaFVVV3RTYVUwd1NURlRWVTV1Wld0MFZFNVlaR2xpVjFKcVUxZHNORmt3YkRGUmVs\nSnVaRlZOTUdKWFZrUk9TRTR4VVhwU2MxUXdUVEZoUlRsRVRrYzBjbEY2VW5kY2JscFZUVEZoYTFv\nellWVTVjMlF5YkU1bGEydDZWRzF3VW1WVmJFaFRhbFpyVWpGYU5sZEZUa3RQVlhoSlpFZE9TbVJW\nVFRCaFdGWkVUa2hSY2xGNlZuQlVNRTB3WTIxV1JFNVhhRkJjYmxGNlVuVkxNRTB3WTBkV1JFNVhj\nRWRrTW14UVlraGtjRnBGWkZkbGJWSkVVVmhTU2xKVk5USlpNR2h5WkZkT1NFNVhOVmxSTUd4NlYw\nVk9UVm96VmtwVVIyUXhVMjAxYm1SVmVFMWNibG96Vmt0V1IyUXhWMVpTYm1SVmIzWmFNMVpNVjBk\na01WZFlhR3BUVjNCM1dUQnNjVlJZYkU5bGJHdDNWRmRzUTJGWFZsbFZiWGhxVFZoa2NGcHNUalJP\nTVdoRVZFZGtNVk5ZU201Y2JtUlZlRzFhTTFaYVlXMWtNVk42VG01a1ZteFZXak5XUzB3eVpERlRN\nV2h1WkZac05Ga3diSEZqUjA1S1lteEtjMWw2VGxKa1YwNUlUbGMxV1ZFd2JIcFhSVTVOV2pOV1Ns\nUkhaREZjYmxOdE5XNWtWWGhOV2pOV1MxWkhaREZYVmxKdVpGVnZkbG96Vmt4WFIyUXhWMWhvYWxO\nWGNIZFpNR3h4VkZoc1QyVnNhM2RVVjJ4RFlWZFdXVlZ0ZUdwTldHUndXbXhaZDJGVFNqbGNiaUk9\nIn0=';

          // const b = a.replace(/\n/g, '');
          // const c = atob(b);
          // const i = JSON.parse(c).data;
          // const f = atob(i);
          // const g = f.slice(1, -1);
          // const h = g.replace(/\\n/g, '');
          // const j = atob(h);
          // const k = JSON.parse(j).data;
          // const l = Base64.decode(k);
          // const m = JSON.parse(l)
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
}
