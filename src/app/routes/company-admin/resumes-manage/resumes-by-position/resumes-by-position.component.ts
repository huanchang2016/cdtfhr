import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';

@Component({
  selector: 'app-resumes-by-position',
  templateUrl: './resumes-by-position.component.html',
  styleUrls: ['./resumes-by-position.component.less']
})
export class ResumesByPositionComponent implements OnInit {

  is_more:boolean = false; // 展开更多搜索条件

  search_text:string = '';

  itemType:'simple' | 'card' = 'card';

  positionId:number;

  searchOption:{ [key:string]: any } = {};
  option:{ [key:string]: any } = {
    resume_status: 1
  };

  total: number = 0;

  positionInfo:any = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    public settingService: GlobalSettingsService
  ) {
    // 获取 最新 收到的简历 type === 'new' ?
    // this.activatedRoute.queryParams.subscribe(params => this.total = params['total']);
    // 获取当前的职位 id
    this.activatedRoute.params.subscribe((parmas:Params) => {
      this.positionId = +parmas['positionId'];
      this.option['position_id'] = this.positionId;
      this.getPositionInfo();
      this.getTotalConfig();
      // 根据职位id 获取 各个状态的简历列表
    })
  }

  ngOnInit(): void {
    
    console.log(this.total, 'this total 收到的简历个数', this.searchOption)
  }

  getPositionInfo():void {
    this.settingService.get(`/v1/web/jobs/${this.positionId}`).subscribe((res:ApiData) => {
      console.log(res, '职位详细情况');
      if(res.code === 200) {
        this.positionInfo = res.data;
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
  }
  
  search():void { // 回车事件
    console.log('search text change', this.search_text, this.searchOption);
    const keywords:string = this.search_text ? this.search_text.trim() : null;
    if(this.searchOption.keywords) {
      if(keywords === this.searchOption.keywords) {
        return;
      }
    }
    this.searchOptionConfig({ keywords: keywords });
  }

  searchValueChange(option:any):void { // 更多 搜索条件发生变化
    console.log('more search option change', option, 'search_text', this.search_text);
    this.searchOptionConfig(option);
  }


  selectChange(status:number):void {
    console.log(status, 'change tabs, status changed!');
    this.searchOptionConfig({ resume_status: status });
  }

  searchOptionConfig(option:any = {}):void {
    const obj = Object.assign(this.searchOption, option);
    this.option = {...obj };
    console.log('....', this.option, option);
  }


  showMoreSearch():void {
    this.is_more = !this.is_more;
  }
}
