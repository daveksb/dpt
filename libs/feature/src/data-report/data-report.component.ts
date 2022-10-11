import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MainApiService } from '@dpt/shared';
import {
  DataReturn,
  LineReport,
  LineReportSerie,
  ReportByDate,
  ReportByUser,
} from 'libs/shared/src/lib/share.model';
import { DateTime } from 'luxon';
@Component({
  selector: 'dpt-data-report',
  templateUrl: './data-report.component.html',
  styleUrls: ['./data-report.component.scss'],
})
export class DataReportComponent implements OnInit {
  view: any = [1500, undefined];
  form = new FormGroup({
    startDate: new FormControl<Date>(new Date(), Validators.required),
    endDate: new FormControl<Date>(new Date(), Validators.required),
    apiId: new FormControl(null, Validators.required),
  });
  // options
  legend = true;
  showLabels = true;
  animations = true;
  xAxis = true;
  yAxis = true;
  showYAxisLabel = true;
  showXAxisLabel = true;
  xAxisLabel = 'เวลา';
  yAxisLabel = 'จำนวนการใช้งาน API';
  apiXAxisLabel = 'ตำแหน่ง';
  apiYAxisLabel = 'จำนวนครั้ง';
  timeline = true;
  count = 0;
  multi: any = [
    {
      name: 'Germany',
      series: [
        {
          name: '1990',
          value: 62000000,
        },
        {
          name: '2010',
          value: 73000000,
        },
        {
          name: '2011',
          value: 89400000,
        },
      ],
    },
  ];
  apiList: DataReturn[] = [];
  colorScheme: any = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };
  tabIndex = 0;
  reportByDate: LineReport[] = [];
  reportByUser: LineReportSerie[] = [];
  apiName = '';
  constructor(private apiService: MainApiService) {
    this.apiService.getPublishList().subscribe((res) => {
      if (res.returnCode === '00') {
        this.apiList = res.datareturn;
      }
    });
  }

  ngOnInit(): void {
    if (this.form.valid) {
      this.refresh();
    }
    this.form.valueChanges.subscribe(() => {
      if (this.form.valid) {
        this.refresh();
        this.apiName =
          this.apiList.find((a) => a.apiId === (this.form.value.apiId ?? ''))
            ?.apiName ?? '';
      }
    });
  }
  refresh() {
    const form = this.form.value;
    if (!(this.form.valid && form.startDate && form.endDate && form.apiId))
      return;
    if (this.tabIndex === 0) {
      this.apiService
        .getReportByDate(
          DateTime.fromJSDate(form.startDate).toISODate().toString() +
            'T00:00:00',
          DateTime.fromJSDate(form.endDate).toISODate().toString() +
            'T23:59:59',
          form.apiId
        )
        .subscribe((res) => {
          if (res.returnCode === '00') {
            this.count = res.datareturn.reduce((p, c) => p + c.count, 0);
            this.mapFromReportByDate(res.datareturn);
          }
        });
    } else {
      this.apiService
        .getReportByUser(
          DateTime.fromJSDate(form.startDate).toISODate().toString() +
            'T00:00:00',
          DateTime.fromJSDate(form.endDate).toISODate().toString() +
            'T23:59:59',
          form.apiId
        )
        .subscribe((res) => {
          if (res.returnCode === '00') {
            this.mapFromReportByUser(res.datareturn);
          }
        });
    }
  }
  onIndexChange(index: number) {
    this.tabIndex = index;
    this.refresh();
  }
  mapFromReportByDate(list: ReportByDate[]) {
    this.reportByDate = [
      {
        name: this.apiName,
        series: list.map((a) => {
          return {
            name: DateTime.fromISO(a.timeline)
              .toFormat('yyyy/LLL/dd hh:mm:ss')
              .toString(),
            value: Number(a.count),
          };
        }),
      },
    ];
  }
  mapFromReportByUser(list: ReportByUser[]) {
    this.reportByUser = list.map((a) => {
      return {
        name: a.role.toString(),
        value: Number(a.count),
      };
    });
  }
}
