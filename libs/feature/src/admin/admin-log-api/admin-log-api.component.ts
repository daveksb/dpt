import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MainApiService } from '@dpt/shared';
import { DateTime } from 'luxon';

@Component({
  selector: 'dpt-admin-log-api',
  templateUrl: './admin-log-api.component.html',
  styleUrls: ['./admin-log-api.component.scss'],
})
export class AdminLogApiComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  form = new FormGroup({
    startDate: new FormControl<Date>(new Date(), Validators.required),
    endDate: new FormControl<Date>(new Date(), Validators.required),
  });

  displayedColumns: string[] = [
    'order',
    'fullName',
    'departmentName',
    'username',
    'apiName',
    'ipAddress',
    'logsCreate',
  ];

  dataSource = new MatTableDataSource();
  constructor(private dialog: MatDialog, private apiService: MainApiService) {}
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.refresh();
    this.form.valueChanges.subscribe(() => {
      if (this.form.valid) {
        this.refresh();
      }
    });
  }
  refresh() {
    const form = this.form.value;
    if (!(this.form.valid && form.startDate && form.endDate)) return;
    this.apiService
      .getAdminLogByDate(
        DateTime.fromJSDate(form.startDate).toISODate().toString() +
          ' 00:00:00',
        DateTime.fromJSDate(form.endDate).toISODate().toString() + ' 23:59:59'
      )
      .subscribe((res) => {
        if (res.returnCode === '00') {
          this.dataSource.data = res.datareturn;
        }
      });
  }
}
