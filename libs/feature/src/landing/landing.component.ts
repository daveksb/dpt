import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MainApiService, UserService } from '@dpt/shared';
import { Category, DataReturn } from 'libs/shared/src/lib/share.model';

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
  defaultData: DataReturn[] = [];
  constructor(
    private mainApiService: MainApiService,
    private userService: UserService
  ) {}

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
  }
  search() {
    this.currentData = (
      JSON.parse(JSON.stringify(this.defaultData)) as DataReturn[]
    ).filter((a) => {
      return (this.form.value as string)?.trim()
        ? a.apiName.includes(this.form.value)
        : true;
    });
  }
}
