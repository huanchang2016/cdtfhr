import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalSettingsService } from '@core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.less']
})
export class HomePageComponent implements OnInit {
  employList:any[] = [
    {
      title: '名企热招',
      sub_title: '100万+名企在线',
      icon: './assets/imgs/icon/icon_item1.png'
    },
    {
      title: '极速入职',
      sub_title: '快速面试拿高薪',
      icon: './assets/imgs/icon/icon_item2.png'
    },
    {
      title: '有投必应',
      sub_title: '24小时急速反应',
      icon: './assets/imgs/icon/icon_item3.png'
    },
    {
      title: '行业权威',
      sub_title: '2000万+职场人选择',
      icon: './assets/imgs/icon/icon_item4.png'
    }
  ];
  

  constructor(
    private router: Router,
    private settingService: GlobalSettingsService
  ) { }

  ngOnInit(): void {
    this.settingService.setTitle('天府菁英网');
  }

  searchOptionChange(option:any):void {
    let url: string = `/recruit/home?type=${option.type}&city_id=${option.city_id}`;
    if(option.keywords && option.keywords.trim()) {
      url = url + '&keywords=' + option.keywords.trim();
    }
    this.router.navigateByUrl(url);
  }
}
