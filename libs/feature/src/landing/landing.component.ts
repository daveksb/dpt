import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MainApiService } from '@dpt/shared';
import { Category, DataReturn } from 'libs/shared/src/lib/share.model';
import { Router } from '@angular/router';
import { LegendPosition } from '@swimlane/ngx-charts';

interface GraphData {
  name: string;
  value: number;
}
@Component({
  selector: 'dpt-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  category: Category[] = [];
  form = new FormControl();
  mapCategory: any = {
    1: 'target.svg',
    2: 'expand.svg',
    3: 'file.svg',
    4: 'global.svg',
  };
  mapCount: any = {
    '1': '0',
    '2': '0',
    '3': '0',
    '4': '0',
  };
  currentData: DataReturn[] = [];
  currentCategory = '';
  defaultData: DataReturn[] = [];

  single = [
    {
      name: 'Germany',
      value: 8940000,
    },
    {
      name: 'USA',
      value: 5000000,
    },
    {
      name: 'France',
      value: 7200000,
    },
    {
      name: 'UK',
      value: 6200000,
    },
  ];
  view: any[] = [700, 400];

  // options
  gradient = true;
  showLegend = true;
  showLabels = true;
  isDoughnut = false;
  legendPosition = LegendPosition.Below;
  categoryStatistics: GraphData[] = [];
  apiStatistics: GraphData[] = [];
  departmentStatistics: GraphData[] = [];
  provinceStatistics: GraphData[] = [];
  constructor(private mainApiService: MainApiService, private route: Router) {}

  onOpenFile(a: any) {}
  ngOnInit(): void {
    this.mainApiService.getCategory().subscribe((a: any) => {
      this.category = a.Category;
      this.mainApiService.getLandingList().subscribe({
        next: (res) => {
          if (res.returnCode === '00') {
            this.currentData = res.datareturn as DataReturn[];
            this.defaultData = res.datareturn as DataReturn[];
            const temp: any = {};
            res.datareturn.forEach((res) => {
              const catId =
                this.category.find((a) => a.catName === res.catName)?.catId ??
                0;
              temp[catId] = temp[catId] ? temp[catId] + 1 : 1;
            });
            this.mapCount = temp;
          } else {
          }
        },
        error: (err) => {},
      });
    });
    this.mainApiService.getCategoryStatistic().subscribe((a) => {
      this.categoryStatistics = a.dbCATStaticOutput.map((res) => {
        return {
          value: res.COUNTDATA,
          name: res.CAT_NAME ?? '',
        };
      });
    });
    this.mainApiService.getApiStatistic().subscribe((a) => {
      this.apiStatistics = a.dbAPIStaticOutput.map((res) => {
        return {
          value: res.COUNTDATA,
          name: res.API_NAME ?? '',
        };
      });
    });
    this.mainApiService.getDepartmentStatistic().subscribe((a) => {
      this.departmentStatistics = a.dbDEPStaticOutput.map((res) => {
        return {
          value: res.COUNTDATA,
          name: res.DEPARTMENT_NAME ?? '',
        };
      });
    });
    this.mainApiService.getProvinceStatistic().subscribe((a) => {
      this.provinceStatistics = a.dbPROVStaticOutput.map((res) => {
        return {
          value: res.COUNTDATA,
          name: res.PROVINCE_NAME ?? '',
        };
      });
    });
  }
  search() {
    this.currentData = (this.defaultData as DataReturn[]).filter((a) => {
      return (
        ((this.form.value as string)?.trim()
          ? a.apiName.includes(this.form.value)
          : true) &&
        (this.currentCategory ? a.catName === this.currentCategory : true)
      );
    });
  }

  onClickFilterCategory(value: string) {
    if (value === this.currentCategory) {
      this.currentCategory = '';
      this.search();
    } else {
      this.currentCategory = value;
      this.search();
    }
  }
  onClick(data: DataReturn) {
    this.route.navigate(['/data-service-detail/' + data.apiId]);
  }
}
