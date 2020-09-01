import { Component, OnInit } from '@angular/core';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class RecruitHomeComponent implements OnInit {
  
  searchOption:any = {
    sort: 'default',
    salary_id: null,
    type_id: null
  };
  

  list:any[] = []; // 数据列表
  loadingData:boolean = false;
  total:number = 0;
  limit:number = 2;
  pageIndex:number = 1;

  constructor(
    public settingService: GlobalSettingsService
  ) { }

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.loadingData = false;
    //   this.list = [1,2, 3, 4,5,6,7,8,9,10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    // }, 800);
    this.getDataList();
  }
  getDataList():void {
    this.loadingData = true;
    const option:any = {
      limit: this.limit,
      page: this.pageIndex,
      ...this.searchOption
    };
    this.settingService.get(`/v1/web/index/jobs`, option).subscribe((res:ApiData) => {
      console.log(res, 'index 招聘职位列表 works');
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

  sortValueChange() {
    console.log('sortValue change', this.searchOption);
    this.getDataList();
  }


}
