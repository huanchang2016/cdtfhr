import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';

@Component({
  selector: 'app-resumes-collect-list',
  templateUrl: './resumes-collect-list.component.html',
  styleUrls: ['./resumes-collect-list.component.less']
})
export class ResumesCollectListComponent implements OnInit {

  is_more:boolean = false; // 展开更多搜索条件

  itemType:'simple' | 'card' = 'card';

  collectId: number = -1;

  collectFileInfo:any = null;

  searchOption:{ [key:string]: any } = {
    sort: 'newest',  // newest default
    name: null,
    limit: 10,
    page: 1
  };

  option:{ [key:string]: any } = {
    
  };

  type: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private settingService: GlobalSettingsService
  ) {
    // 获取当前的职位 id
    this.activatedRoute.params.subscribe((parmas:Params) => {
      this.collectId = +parmas['id'];
      this.getCollectInfo();
      // 根据收藏夹 id 获取 各个 文件夹内 的简历列表
    })
  }

  ngOnInit(): void {

  }
  getCollectInfo():void {
    let opt:any = null;
    if(this.collectId > 0) {
      opt = { id: this.collectId };
    }
    this.settingService.post('/v1/web/com/find_collect_tag', opt).subscribe((res:ApiData) => {
      console.log('collectFileInfo', res);
      if(res.code === 200) {
        this.collectFileInfo = res.data;
      }
    })
  }

  search():void { // 回车事件
    if(this.searchOption.name) {
      this.searchOption.name = this.searchOption.name.trim();
    }
    this.searchOptionConfig();
  }

  searchValueChange(option:any):void { // 更多 搜索条件发生变化
    console.log('more search option change', option);
    // 重置搜索条件时，分页数据应该重置 为  第一页
    this.searchOption.page = 1;
    this.searchOptionConfig(option);
  }

  pageOptionChanges({ pageSize, pageIndex }):void {
    this.searchOptionConfig({ page: pageIndex, limit: pageSize });
  }

  searchOptionConfig(option:any = {}):void {
    const obj = Object.assign(this.searchOption, option);
    if(this.collectId === -1) {
      return;
    }
    let opt:any = {};
    if(this.collectId > 0) {
      opt['tag_id'] = this.collectId;
    }
    const config:any = { ...obj, ...opt };
    this.getDataList(config);
  }

  sortValueChange():void {
    this.searchOptionConfig();
  }

  loadingData:boolean = false;
  dataOption:any = null;

  getDataList(option:any) {
    console.log('.... 获取简历列表', option);
    this.loadingData = true;
    
    this.settingService.post('/v1/web/com/collect_resume', option).subscribe((res:ApiData) => {
      console.log(res, '简历列表')
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
      }

    }, err => this.loadingData = false)

  }


  showMoreSearch():void {
    this.is_more = !this.is_more;
  }
}
