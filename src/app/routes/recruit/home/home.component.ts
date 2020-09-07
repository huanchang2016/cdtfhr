import { Component, OnInit } from '@angular/core';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';
import { ActivatedRoute, Router } from '@angular/router';

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
  limit:number = 10;
  pageIndex:number = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public settingService: GlobalSettingsService
  ) {
    this.getParams();
  }

  ngOnInit(): void {
    
  }

  paramsOption:any = {};
  getParams():void {
    // 获取 当前页面访问来源，单位处理简历时，从职位下访问过来还是其他路径，
    //  如果是从职位访问当前页面，需要展示当前简历在该职位下的投递处理进度及状态
    this.activatedRoute.queryParams.subscribe(params => {
      console.log('search params', params);
      this.paramsOption = params;
      this.getDataList();
    });

  }
  searchOptionChange(option:any):void {
    let url: string = `/recruit/home?type=${option.type}&city_id=${option.city_id}`;
    if(option.keywords && option.keywords.trim()) {
      url = url + '&keywords=' + option.keywords.trim();
    }
    this.pageIndex = 1;
    this.router.navigateByUrl(url);
  }

  getDataList():void {
    this.loadingData = true;
    const option:any = {
      name: this.paramsOption['keywords'] ? this.paramsOption['keywords'] : null,
      city_id: +this.paramsOption['city_id'],
      limit: this.limit,
      page: this.pageIndex,
      ...this.searchOption
    };
    this.settingService.get(`/v1/web/jobs`, option).subscribe((res:ApiData) => {
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
