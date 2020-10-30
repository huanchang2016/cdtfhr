import { Component, OnInit } from '@angular/core';
import { GlobalSettingsService } from '@core';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-zk-news-list-tpl',
  templateUrl: './zk-news-list-tpl.component.html',
  styleUrls: ['./zk-news-list-tpl.component.less']
})
export class ZkNewsListTplComponent implements OnInit {


  listNotice:any[] = [];
  listNews:any[] = [];

  constructor(
    private settingService: GlobalSettingsService
  ) { }

  ngOnInit(): void {
    this.settingService.setTitle('菁英招考-天府菁英网');

    this.getDataList();
  }

  getDataList():void {
    zip(
      this.settingService.post('/v1/web/exam/news', { page: 1, limit: 5 }),
      this.settingService.post('/v1/web/exam/announce', { page: 1, limit: 5 })
    ).pipe(
      map(([ news, notice]) => [ news.data, notice.data ])
    ).subscribe(([ news, notice ]) => {
      console.log(news, notice);
      this.listNews = news;
      this.listNotice = notice;
    })
  }
}
