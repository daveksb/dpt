import { Component, OnInit } from '@angular/core';
import { MainApiService, UserService } from '@dpt/shared';
import { Category, DataReturn } from 'libs/shared/src/lib/share.model';

@Component({
  selector: 'dpt-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  category: Category[] = [];
  mapCategory: any = {
    1: 'target.svg',
    2: 'expand.svg',
    3: 'file.svg',
    4: 'global.svg',
  };
  mapCount: any = {
    1: '2',
    2: '34',
    3: '15',
    4: '38',
  };
  currentData: DataReturn[] = [];

  constructor(
    private mainApiService: MainApiService,
    private userService: UserService
  ) {}

  onOpenFile(a: any) {}
  ngOnInit(): void {
    if (this.userService.isUserInternal()) {
      this.mainApiService.getPrivateDataList().subscribe({
        next: (res) => {
          console.log(res);
          if (res.returnCode === '00') {
            this.currentData = res.datareturn as DataReturn[];
          } else {
          }
        },
        error: (err) => {},
      });
    } else {
      this.mainApiService.getPublicDataList().subscribe({
        next: (res) => {
          if (res.returnCode === '00') {
            this.currentData = res.datareturn as DataReturn[];
          } else {
          }
        },
        error: (err) => {},
      });
    }
    this.mainApiService.getCategory().subscribe((a: any) => {
      this.category = a.Category;
    });
  }
}
