import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';

@Component({
  selector: 'app-resumes-download-list',
  templateUrl: './resumes-download-list.component.html',
  styleUrls: ['./resumes-download-list.component.less']
})
export class ResumesDownloadListComponent implements OnInit {
  /****
   *  TODO: 处理 下载记录中的职位列表
   * 
   * ********/

  is_more:boolean = false; // 展开更多搜索条件
  
  itemType:'simple' | 'card' = 'card';

  positionId: number = -1;

  positionInfo:any = null;

  searchOption:{ [key:string]: any } = {
    sort: 'newest',  // newest default
    name: null,
    limit: 10,
    page: 10
  };

  option:{ [key:string]: any } = { };

  type: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private settingService: GlobalSettingsService
  ) {
    // 获取当前传递过来的页码
    // 获取当前的职位 id
    this.activatedRoute.params.subscribe((parmas:Params) => {
      this.positionId = +parmas['id'];
      this.getPositionInfo();
      // 根据收藏夹 id 获取 各个 文件夹内 的简历列表
    })
  }

  ngOnInit(): void {
    
    console.log(this.type, 'this type', this.searchOption)
    // this.getDataList();
  }

  getPositionInfo():void {
    let opt:any = null;
    if(this.positionId > 0) {
      opt = { job_id: this.positionId };
    }
    this.settingService.post('/v1/web/com/find_download_resume_job', opt).subscribe((res:ApiData) => {
      console.log('positionInfo', res);
      if(res.code === 200) {
        this.positionInfo = res.data;

        this.settingService.setTitle(`${this.positionInfo.name}-简历库下载记录-天府菁英网`);
      }
    })
  }
  
  search():void { // 回车事件
    console.log('search text change', this.searchOption.name, this.searchOption);
    if(this.searchOption.name) {
      this.searchOption.name = this.searchOption.name.trim();
    }
    this.searchOptionConfig();
  }

  searchValueChange(data:any):void { // 更多 搜索条件发生变化
    console.log('more search option change', data);
    // 重置搜索条件时，分页数据应该重置 为  第一页
    this.searchOption.page = 1;
    if(data.isReset) {
      this.searchOption.name = '';
    }
    this.searchOptionConfig(data.data);
  }

  pageOptionChanges({ pageSize, pageIndex }):void {
    this.searchOptionConfig({ page: pageIndex, page_size: pageSize });
  }

  sortValueChange():void {
    this.searchOptionConfig();
  }

  searchOptionConfig(option:any = {}):void {
    const obj = Object.assign(this.searchOption, option);
    if(this.positionId === -1) {
      return;
    }
    let opt:any = {};
    if(this.positionId > 0) {
      opt['job_id'] = this.positionId;
    }
    const config:any = { ...obj, ...opt };
    this.getDataList(config);
  }


  loadingData:boolean = false;
  dataOption:any = null;

  getDataList(option:any) {
    this.loadingData = true;
    this.settingService.post('/v1/web/com/download_resumes', option).subscribe((res:ApiData) => {
      console.log(res, '简历列表。。。。。。。。。。。。。')
      this.loadingData = false;
      if(res.code === 200) {
        this.dataOption = {
          data: res.data,
          pagination: {
            total: res.meta.pagination.total,
            per_page: res.meta.pagination.per_page,
            current_page: res.meta.pagination.current_page
          }
        }
        this.dealSearchRecord(option);
      }

    }, err => this.loadingData = false)
  }
  params:any = {};
  dealSearchRecord(option:any):void {
    let opt:any = {};
    for (const item in option) {
      if (Object.prototype.hasOwnProperty.call(option, item)) {
        const element = option[item];
        if(element && item !== 'job_id') {
          opt[item] = element;
        }
      }
    }
    opt['download_job_id'] = this.positionId;
    this.params = JSON.stringify({ ...opt });
    console.log(this.params, '下载记录 搜索条件  paramsparamsparamsparams')
  }

  showMoreSearch():void {
    this.is_more = !this.is_more;
  }
}
