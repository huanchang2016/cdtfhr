import { Component, OnInit } from '@angular/core';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';

@Component({
  selector: 'app-hot-recruit',
  templateUrl: './hot-recruit.component.html',
  styleUrls: ['./hot-recruit.component.less']
})
export class HotRecruitComponent implements OnInit {

  list:any[] = []; // 数据列表
  total:number = 0;
  limit:number = 10;
  pageIndex:number = 1;

  loadingData:boolean = true;

  constructor(
    public settingService: GlobalSettingsService
  ) {
    this.settingService.setTitle('热门招聘-天府菁英网');
  }

  ngOnInit(): void {
    this.getDataList();
    
  }
  searchOption:any = {
    name: null,
    city_id: null
  };
  searchOptionChange(option:any):void {
   this.searchOption = option;
   this.pageIndex = 1;
   this.getDataList();
  }

  getDataList():void {
    this.loadingData = true;

    const option:any = {
      name: this.searchOption['keywords'] ? this.searchOption['keywords'] : null,
      city_id: +this.searchOption['city_id'],
      limit: this.limit,
      page: this.pageIndex
    };

    this.settingService.get(`/v1/web/index/latest/ad`, option).subscribe( (res:ApiData) => {
      console.log(res, 'index 热门招聘列表 works');
      this.loadingData = false;
      if(res.code === 200) {
        this.list = res.data;
        if(this.total === 0) {
          this.total = res.meta.pagination.total;
        }
        
        this.pageIndex = res.meta.pagination.current_page;
      }
    }, err => this.loadingData = false)
  }

  pageIndexChange({page}):void {
    console.log(page, 'page changes');
    this.pageIndex = page;
    this.getDataList();
  }

  navTo(url:string):void {
    // if (!url.startsWith('https://') && !url.startsWith('http://')) {
    //   url = 'http://' + url;
    // }
    url = url || '/';
    window.open(url);
  }
}
