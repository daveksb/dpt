import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  NativeDateAdapter,
} from '@angular/material/core';
import { MainApiService, UserService } from '@dpt/shared';
import {
  DataReturn,
  LineReport,
  LineReportSerie,
  ReportByDate,
  ReportByUser,
} from 'libs/shared/src/lib/share.model';
import { DateTime } from 'luxon';
import {
  LuxonDateAdapter,
  MAT_LUXON_DATE_FORMATS,
  MAT_LUXON_DATE_ADAPTER_OPTIONS,
} from '@angular/material-luxon-adapter';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/yyyy',
    monthInput: 'MM',
    yearInput: 'YYYY',
  },
  display: {
    dateInput: 'DD',
    monthInput: 'MMM',
    yearInput: 'yyyy',
    dateA11yLabel: 'DD',
    monthLabel: 'MMM',
    monthDayLabel: 'MMM d',
    monthDayA11yLabel: 'MMMM d',
    monthYearLabel: 'MMM yyyy',
    monthYearA11yLabel: 'MMMM yyyy',
    timeLabel: 'T',
  },
};
@Component({
  selector: 'dpt-data-report',
  templateUrl: './data-report.component.html',
  styleUrls: ['./data-report.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: LuxonDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_LUXON_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_LOCALE, useValue: 'th-TH' },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class DataReportComponent implements OnInit {
  view: any = [1500, undefined];
  form = new FormGroup({
    startDate: new FormControl<DateTime>(DateTime.now(), Validators.required),
    endDate: new FormControl<DateTime>(DateTime.now(), Validators.required),
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

  apiList: Partial<DataReturn>[] = [];
  colorScheme: any = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };
  tabIndex = 0;
  reportByDate: LineReport[] = [];
  reportByUser: LineReportSerie[] = [];
  apiName = '';
  constructor(
    private apiService: MainApiService,
    private userService: UserService
  ) {
    const depId = this.userService.getUser()?.department.departmentId;
    //1 = admin
    //5 = owner
    //6 = owner admin
    // fix code due to req
    const role = this.userService.getUser()?.role.roleId;
    if (role === '1') {
      this.apiService.getPublishList().subscribe((res) => {
        if (res.returnCode === '00') {
          this.apiList = res.datareturn;
          this.apiList.unshift({
            apiId: 'all',
            apiName: 'ทั้งหมด',
          });
        }
      });
    } else {
      this.apiService.getPublishList(depId).subscribe((res) => {
        if (res.returnCode === '00') {
          this.apiList = res.datareturn;
          this.apiList.unshift({
            apiId: 'all',
            apiName: 'ทั้งหมด',
          });
        }
      });
    }
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
          form.startDate.toISODate().toString() + 'T00:00:00',
          form.endDate.toISODate().toString() + 'T23:59:59',
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
          form.startDate.toISODate().toString() + 'T00:00:00',
          form.endDate.toISODate().toString() + 'T23:59:59',
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
    let format = 'yyyy/LLL/dd hh:mm:ss';
    if (
      this.form.value.startDate &&
      this.form.value.endDate &&
      this.form.value.startDate?.hasSame(this.form.value?.endDate, 'day')
    ) {
      format = 'HH:mm:ss';
    } else {
      format = 'dd/MMM/yyyy';
    }
    this.reportByDate = [
      {
        name: this.apiName,
        series: list.map((a) => {
          return {
            name: DateTime.fromISO(a.timeline).toFormat(format).toString(),
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
