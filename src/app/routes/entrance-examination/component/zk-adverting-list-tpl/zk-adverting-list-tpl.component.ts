import { Component, OnInit } from '@angular/core';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';

@Component({
  selector: 'app-zk-adverting-list-tpl',
  templateUrl: './zk-adverting-list-tpl.component.html',
  styleUrls: ['./zk-adverting-list-tpl.component.less']
})
export class ZkAdvertingListTplComponent implements OnInit {

  list:any[] = [];

  constructor(
    private settingService: GlobalSettingsService
  ) { }


  ngOnInit(): void {
    this.getDataList();
  }

  getDataList():void {
    this.settingService.get('/v1/web/exam/ads').subscribe( (res:ApiData) => {
      console.log(res, 'xam/ads');
      if(res.code === 200) {
        this.list = res.data;
      }
    })
  }

  goTo(url: string):void {
    const _url:string = url || '/';
    window.open(_url);
  }
  
}
