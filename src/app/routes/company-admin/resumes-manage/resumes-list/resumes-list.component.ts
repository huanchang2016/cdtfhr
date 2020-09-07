import { Component, OnInit } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { differenceInYears } from 'date-fns';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';

@Component({
  selector: 'app-resumes-list',
  templateUrl: './resumes-list.component.html',
  styleUrls: ['./resumes-list.component.less']
})
export class ResumesListComponent implements OnInit {

  historyData = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.'
  ]; // 历史搜索记录

  loadingData:boolean = false;
  listOfData:any[] = [];

  list:any[] = []; // 当前页得数据

  searchOptions:any = {
    pageIndex: 1,
    pageSize: 10,
    sort: 'newest'  // 最新 newest,  相关度 correlation
  };
  total:number; // 总数
  
  constructor(
    private msg: NzMessageService,
    private settingService: GlobalSettingsService
  ) {}

  searchConfigs:any = {};


  ngOnInit(): void {
    this.getHistoryRecord();
  }

  getHistoryRecord():void {
    this.settingService.get('/v1/web/com/resume/search_log').subscribe((res:ApiData) => {
      console.log('简历搜索历史记录', res);
      this.historyData = res.data;
    })
  }

  getDataList() {
    this.loadingData = true;
    
    const option:any = {
      ...this.searchConfigs,
      sort: this.searchOptions.sort,
      limit: this.searchOptions.pageSize,
      page: this.searchOptions.pageIndex
    };
    this.loadingData = true;

    this.settingService.post(`/v1/web/com/resume/search`, option).subscribe( (res:ApiData) => {
      console.log(res, '搜索简历', option);
      this.loadingData = false;
      if(res.code === 200) {
        this.listOfData = res.data;
        this.total = res.meta.pagination.total;
      }
    }, err => this.loadingData = false);
  }

  searchValueChange(option:any):void {
    console.log('search option change', option);
    this.searchConfigs = option;
    this.getDataList();
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params, 'params');
    // const { pageSize, pageIndex, sort, filter } = params;
    // const currentSort = sort.find(item => item.value !== null);
    // const sortField = (currentSort && currentSort.key) || null;
    // const sortOrder = (currentSort && currentSort.value) || null;
    
  }

  sortChange():void {
    console.log('%csort type changed!','color: #f00', this.searchOptions);
  }

  historyClick(data:any):void {
    console.log('点击历史搜索jil ', data)
  }

  countYears(t:string):number { // 计算 t  至今的时间段（多少年）
    const today:Date = new Date();
    const year:number = differenceInYears(today, new Date(t));
    return year;
  }

}
