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


  listOne:any[] = [1, 2, 3, 4, 5];
  listTwo:any[] = [1, 2, 3, 4, 5];

  constructor(
    private settingService: GlobalSettingsService
  ) { }

  ngOnInit(): void {
    this.settingService.setTitle('菁英招考-天府菁英网');

    this.getDataList();
  }

  getDataList():void {
    zip(
      // this.settingService.get(`/v1/web/setting/city`),
      // this.settingService.get(`/v1/web/setting/city/all`)
    ).pipe(
      map(([ province, city]) => [ province.data, city.data])
    ).subscribe(([ province, city]) => {
      
    })
  }
}
