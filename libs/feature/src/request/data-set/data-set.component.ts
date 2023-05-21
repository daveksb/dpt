import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { MainApiService } from '@dpt/shared';
@Component({
  selector: 'dpt-data-set',
  templateUrl: './data-set.component.html',
  styleUrls: ['./data-set.component.scss'],
})
export class DataSetComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('admin') adminRef!: ElementRef<HTMLDivElement>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'order',
    'apiName',
    'zone',
    'createDate',
    'expireDate',
  ];

  dataSource = new MatTableDataSource();
  constructor(private dialog: MatDialog, private apiService: MainApiService) {}
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.refresh();
  }
  refresh() {
    this.apiService.getRequestedData().subscribe((res) => {
      if (res.datareturn) {
        const data = res.datareturn?.sort((a, b) => {
          if (a.createDate < b.createDate) {
            return 1;
          } else {
            return -1;
          }
        });
        this.dataSource.data = data;
      }
    });
  }
  pageChange(page: any) {
    if (page.previousPageIndex !== page?.pageIndex) {
      this.adminRef.nativeElement.scrollTop = 0;
    }
  }
}
