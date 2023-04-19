import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article, MainApiService } from '@dpt/shared';
import { Base64 } from 'js-base64';
interface DPTFile {
  fileName: string;
  data: ArrayBuffer | null;
}
@Component({
  selector: 'dpt-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
})
export class ArticleDetailComponent implements OnInit {
  tempFile?: any;

  tid = '';
  isEdit = false;
  article?: Article;
  constructor(
    private activateRoute: ActivatedRoute,
    private mainService: MainApiService
  ) {
    this.tid = activateRoute.snapshot.params['id'];
    if (this.tid) {
      this.mainService.getArticleDetail(this.tid).subscribe((res) => {
        this.article = res;
      });
    }
  }

  ngOnInit(): void {}
}
