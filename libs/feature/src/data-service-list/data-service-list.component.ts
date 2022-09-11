import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { DataRequestFormComponent } from '@dpt/form';

@Component({
  selector: 'dpt-data-service-list',
  templateUrl: './data-service-list.component.html',
  styleUrls: ['./data-service-list.component.scss'],
})
export class DataServiceListComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  form = new FormControl();
  sideBarList = [
    {
      value: 1,
      label: 'เขตการปกครอง',
      count: 10,
    },
    {
      value: 2,
      label: 'การใช้ที่ดินปัจจุบัน',
      count: 10,
    },
    {
      value: 3,
      label: 'เขตผังเมืองรวม',
      count: 10,
    },
    {
      value: 4,
      label: 'การจำแนกการใช้ที่ดิน',
      count: 10,
    },
    {
      value: 5,
      label: 'Category 5',
      count: 10,
    },
  ];
  displayedColumns: string[] = [
    'order',
    'fullName',
    'department',
    'userName',
    'dataName',
    'action',
  ];

  tempData = [
    {
      department: 'สำนักผังประเทศและผังภาค',
      topic:
        'ประกาศคณะกรรมนโยบายการผังเมืองแห่งชาติ : เรื่องผังนโยบายระดับประเทศ',
      subTopic:
        'สำนักผังประเทศและผังภาคตัวอย่าง ว่าด้วยเรื่องประกาศคณะกรรมนโยบายการผังนโยบายระดับประเทศ',
      view: 20,
      dataId: 1,
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
      categoryId: 1,
      category: 'การจำแนกการใช้ที่ดิน',
    },
    {
      department: 'สำนักควบคุมและตรวจสอบอาคาร',
      topic: 'กฎกระทรวงผังเมืองรวมจังหวัด',
      subTopic:
        'สำนักผังประเทศและผังภาคตัวอย่าง ว่าด้วยเรื่องประกาศคณะกรรมนโยบายการผังนโยบายระดับประเทศ',
      view: 20,
      dataId: 1,
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
      categoryId: 2,
      category: 'Category 2',
    },
    {
      department: 'testdep',
      topic: 'testtop',
      subTopic: 'testsub',
      view: 20,
      dataId: 1,
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
      categoryId: 3,
      category: 'Category 3',
    },
    {
      department: 'testdep',
      topic: 'testtop',
      subTopic: 'testsub',
      view: 20,
      dataId: 1,
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
      categoryId: 1,
      category: 'การจำแนกการใช้ที่ดิน',
    },
    {
      department: 'testdep',
      topic: 'testtop',
      subTopic: 'testsub',
      view: 20,
      dataId: 1,
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
      categoryId: 1,
      category: 'การจำแนกการใช้ที่ดิน',
    },
    {
      department: 'testdep',
      topic: 'testtop',
      subTopic: 'testsub',
      view: 20,
      dataId: 1,
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
      categoryId: 1,
      category: 'การจำแนกการใช้ที่ดิน',
    },
    {
      department: 'testdep',
      topic: 'testtop',
      subTopic: 'testsub',
      view: 20,
      dataId: 1,
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
      categoryId: 1,
      category: 'การจำแนกการใช้ที่ดิน',
    },
  ];

  currentTempData = JSON.parse(JSON.stringify(this.tempData));
  categoryList = [
    {
      label: 'Test category',
      value: 'test value',
    },
    {
      label: 'Test category',
      value: 'test value',
    },
  ];
  currentCategoryId = -1;
  constructor(private dialog: MatDialog, private route: Router) {}

  onClickFilterCategory(value: number) {
    if (value === this.currentCategoryId) {
      this.currentTempData = JSON.parse(JSON.stringify(this.categoryList));
    } else {
      this.currentCategoryId = value;
      this.currentTempData = (
        JSON.parse(JSON.stringify(this.categoryList)) as any[]
      ).filter((cat) => {
        cat.categoryId === value;
      });
    }
  }

  onOpenFile(a: any) {}
  ngOnInit(): void {}
  sortChange(sortState: Sort | any) {}
  onSearch() {
    console.log('onSearch');
  }
  onRequest() {
    this.route.navigate(['data-service-request']);
  }
  onView(id: number) {
    console.log('onView', id);
    const data = {
      departmentType: 1,
      department: 'test',
      requestFullName: 'test test',
      category: 'test category',
      dataName: 'dataName',
      detail: 'detail',
      files: [
        {
          name: 'name',
          fileSize: 50,
        },
        {
          name: 'name',
          fileSize: 50,
        },
      ],
    };
    const dialogRef = this.dialog.open(DataRequestFormComponent, {
      data,
      maxHeight: '800px',
      width: '1000px',
    });
  }
  onNavigateData(id: number) {
    this.route.navigate([`data-service-detail/${id}`]);
  }
}
