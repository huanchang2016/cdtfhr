import { Component, OnInit } from '@angular/core';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';

@Component({
  selector: 'app-right-sidebar-advert',
  templateUrl: './right-sidebar-advert.component.html',
  styleUrls: ['./right-sidebar-advert.component.less']
})
export class RightSidebarAdvertComponent implements OnInit {
  loadingData: boolean = true;

  list: any[] = [];

  constructor(
    public settingService: GlobalSettingsService
  ) { }
  
  ngOnInit(): void {

    this.loadingData = true;
      this.settingService.get('/v1/web/index/latest/ad?limit=2').subscribe((res:ApiData) => {
        this.loadingData = false;
        this.list = res.data;
      }, err => this.loadingData = false);
  }
  navTo(url:string):void {
    // if (!url.startsWith('https://') && !url.startsWith('http://')) {
    //   url = 'http://' + url;
    // }
    url = url || '/';
    window.open(url);
  }
}
