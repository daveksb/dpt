import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataServiceDialogComponent, TopNavComponent } from '@dpt/ui';
import { Route, Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
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
export class DataServiceDetailComponent {
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

  displayedColumns: string[] = ['name', 'type', 'description', 'default'];
  dataSource = new MatTableDataSource(this.data.api.apiParams);

  constructor(public dialog: MatDialog, private router: Router) {}

  onShowExampleData() {
    this.dialog.open(DataServiceDialogComponent, {
      width: '500px',
    });
  }
  onRequestData() {
    this.dialog.open(DataServiceDialogComponent, {
      width: '500px',
    });
    // this.router.navigate(['data-service-request']);
  }
}
