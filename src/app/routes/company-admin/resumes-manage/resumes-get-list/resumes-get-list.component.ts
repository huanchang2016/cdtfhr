import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';

@Component({
  selector: 'app-resumes-get-list',
  templateUrl: './resumes-get-list.component.html',
  styleUrls: ['./resumes-get-list.component.less']
})
export class ResumesGetListComponent implements OnInit {

  is_more:boolean = false; // 展开更多搜索条件

  keywords:string = '';

  itemType:'simple' | 'card' = 'card';

  positionId:number;

  searchOption:{ [key:string]: any } = {};

  status:number = 0;

  total: number = 0; // 所有状态对应的 简历 总数

  pageOption:any = {
    total: 1,
    limit: 10,
    page: 1
  }

  positionInfo:any = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    public settingService: GlobalSettingsService
  ) {
    // 获取当前的职位 id
    this.activatedRoute.params.subscribe((parmas:Params) => {
      this.positionId = +parmas['positionId'];
      this.getPositionInfo();
      this.getTotalConfig();
      // 根据职位id 获取 各个状态的简历列表
      this.searchOptionConfig();
    })
  }

  ngOnInit(): void {
    
  }

  getPositionInfo():void {
    this.settingService.get(`/v1/web/jobs/${this.positionId}`).subscribe((res:ApiData) => {
      console.log(res, '职位详细情况');
      if(res.code === 200) {
        this.positionInfo = res.data;
        this.settingService.setTitle(`收到的简历-${this.positionInfo.name}-天府菁英网`);
      }
    });
  }

  totalConfig:any = null;
  getTotalConfig():void {
    this.settingService.post(`/v1/web/com/delivery/resume_status_count`, { job_id: this.positionId }).subscribe((res:ApiData) => {
      console.log(res, '简历数据统计情况');
      if(res.code === 200) {
        this.totalConfig = res.data;
        this.total = (Object.values(this.totalConfig) as Array<number>).reduce( (a:any, b:any) => a + b , 0);
      }
      console.log(this.total, this.totalConfig)
    });
  }

  totalConfigChange():void {
    this.getTotalConfig();
    this.searchOptionConfig(); // 简历操作成功后，需要重新获取数据
  }
  
  search():void { // 回车事件
    this.searchOptionConfig();
  }

  searchValueChange(data:any):void { // 更多 搜索条件发生变化
    this.searchOption = { ...data.data };
    if(data.isReset) {
      this.keywords = '';
    }
    
    this.searchOptionConfig();
  }

  tabIndexChange(status:number):void {
    this.status = status;
    this.searchOptionConfig();
  }

  // 合并后的搜索条件
  searchOptionConfig():void {
    const obj = {
      name: this.keywords,
      status: this.status + 1,
      job_id: this.positionId,
      ...this.pageOption,
      ...this.searchOption
    }
    this.getDataList(obj);
  }

  listOfData:any[] = [];
  loadingData:boolean = false;

  getDataList(option:any) {
    this.loadingData = true;
    this.listOfData = [];
    this.settingService.post(`/v1/web/com/delivery/resume`, option).subscribe( (res:ApiData) => {
      this.loadingData = false;
      if(res.code === 200) {
        this.listOfData = res.data;
        this.pageOption.total = res.meta.pagination.total;
        
      }
    }, err => this.loadingData = false);
  }

  paginationChanges({ pageSize, pageIndex }):void {
    this.pageOption.limit = pageSize;
    this.pageOption.page = pageIndex;

    this.searchOptionConfig();
  }

  showMoreSearch():void {
    this.is_more = !this.is_more;
  }
}
