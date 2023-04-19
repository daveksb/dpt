import { Component, OnInit } from '@angular/core';
import { Article, MainApiService } from '@dpt/shared';
import { Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { Base64 } from 'js-base64';

@Component({
  selector: 'dpt-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  selectedIndex = 0;
  articleList: Article[] = [];
  constructor(private route: Router, private mainApiService: MainApiService) {}

  onOpenFile(a: any) {}
  ngOnInit(): void {
    this.mainApiService
      .getArticle()
      .pipe(
        map((res) => {
          return res.datareturn
            .filter((d, i) => i < 4)
            .map((d) => {
              let tempThumbnail = '';
              if (d.thumbnail) {
                tempThumbnail = JSON.parse(Base64.decode(d.thumbnail))?.data;
              }
              return {
                ...d,
                tempThumbnail,
              };
            });
        })
      )
      .subscribe((res) => {
        this.articleList = res;
      });
  }
  onClick(link: string) {
    this.route.navigate([`article/${link}`]);
    // window.open(link, '_blank');
  }
  getSafeHtml(a: string) {
    return a;
  }
  onError(event: any, item: Article) {
    event.target.src = 'https://www.dpt.go.th/assets/app/images/logo.png';
  }
}
