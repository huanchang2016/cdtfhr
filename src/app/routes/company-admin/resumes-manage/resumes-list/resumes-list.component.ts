import { Component, OnInit } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { differenceInYears } from 'date-fns';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';

@Component({
  selector: 'app-resumes-list',
  templateUrl: './resumes-list.component.html',
  styleUrls: ['./resumes-list.component.less']
})
export class ResumesListComponent implements OnInit {

  historyData = []; // 历史搜索记录
  historyLoading: boolean = true;
  resetSearchOption:any = null;

  loadingData:boolean = false;
  listOfData:any[] = [];

  searchOptions:any = {
    pageIndex: 1,
    pageSize: 10,
    sort: 'newest'  // 最新 newest,  相关度 correlation
  };
  total:number; // 总数
  
  constructor(
    private settingService: GlobalSettingsService
  ) {
    this.settingService.setTitle('简历搜索-简历管理-天府菁英网');
  }

  searchConfigs:any = {};


  ngOnInit(): void {
    this.getHistoryRecord();
  }

  getHistoryRecord():void {
    this.historyLoading = true;
    this.settingService.post('/v1/web/com/resume/search_log').subscribe((res:ApiData) => {
      this.historyLoading = false;
      console.log('简历搜索历史记录', res);
      this.historyData = res.data;
    }, err => this.historyLoading = false)
  }

  concatSearchValue(item:any):string {
    // step 1  先过滤条件中 value 为空的值
    const option:any = {};
    let val:string = '';
    for (const key in item) {
      if (Object.prototype.hasOwnProperty.call(item, key)) {
        const element = item[key];
        if(element) {
          // option[key] = item[key];
          switch (key) {
            case 'name':
              val += element;
              break;
            case 'city':
              val += `+${element.name}+${element.province.name}`;
              break;
            case 'now_city':
              val += `+${element.name}+${element.province.name}`;
              break;
            case 'industry':
              val += `+${element.name}`;
              break;
            case 'hope_industry':
              val += `+${element.name}`;
              break;
            case 'status_data':
              val += `+${element.name}`;
              break;
            case 'updated_at':
              val += `+${this.selectRefreshReusmeKey(element)}`;
              break;
            case 'min_age':
              if(item['max_age'] > 0) {
                val += `+${element}至${item['max_age']}岁`;
              }else {
                val += `+${element}岁以上`;
              }
              
              break;
            // case 'max_age':
            //   val += `+${element}岁`;
            //   break;
            case 'company_name':
              val += `+${element}`;
              break;
            case 'company_type_data':
              val += `+${element.name}`;
              break;
            case 'school':
              val += `+${element}`;
              break;
            case 'major':
              val += `+${element}`;
              break;
            case 'salary_data':
              val += `+${element.name}/月`;
              break;
            case 'hope_salary_data':
              val += `+${element.name}/月`;
              break;
            case 'edu_data':
              val += `+${element.name}`;
              break;
            case 'work':
              if(element === '10-0') {
                val += '10年以上';
              }else {
                val += `+${element}年`;
              }
              break;
            case 'sex':
              val += `+${element}`;
              break;
            case 'sort':
              if(element === "newest") {
                val += '+最新';
              }else {
                val += `+相关度`;
              }
              break;

            default:
              break;
          }
        }
      }
    }

    if(val.length > 20) {
      val = val.slice(0, 20) + '......';
    }
    return val;
  }

  selectRefreshReusmeKey(day:number): string { // 匹配简历更新时间
    return this.settingService.updatedTimeOptions.filter( v => v.value === day)[0].key;
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
        const list:any[] = res.data;
        if(this.searchOptions.sort === 'correlation') {
          this.listOfData = list.sort((a:any, b:any) => b.correlation - a.correlation);
        }else {
          this.listOfData = list;
        }
        this.total = res.meta.pagination.total;
        // 搜索后，需要重新获取 搜索记录
        this.getHistoryRecord();
      }
    }, err => this.loadingData = false);
  }

  searchValueChange(option:any):void {
    console.log('search option change', option);
    if(option.name) { // 关键字必填才可以搜索
      this.searchConfigs = option;
      this.getDataList();
    }else {
      this.listOfData = [];
      this.total = 0;
    }
    
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params, 'params xxxxxxxxxxxxxx');
    if(this.searchConfigs.name) {
      this.getDataList();
    }
  }

  sortChange():void {
    console.log('%csort type changed!','color: #f00', this.searchOptions);
    if(this.searchConfigs.name) {
      this.getDataList();
    }
  }

  historyClick(data:any):void {
    console.log('点击历史搜索jil ', data);
    this.resetSearchOption = { ...data };
    this.searchOptions.sort = data.sort;
  }

  countYears(t:string):number { // 计算 t  至今的时间段（多少年）
    const today:Date = new Date();
    const year:number = differenceInYears(today, new Date(t));
    return year;
  }

}
