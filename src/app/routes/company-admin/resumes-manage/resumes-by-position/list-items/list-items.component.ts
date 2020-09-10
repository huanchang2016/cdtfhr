import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { environment } from '@env/environment';
import { differenceInYears } from 'date-fns';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.less']
})
export class ListItemsComponent implements OnChanges {
  @Input() itemType:string;
  @Input() option:any;
  @Input() positionId:number;

  @Output() totalConfigChange:EventEmitter<any> = new EventEmitter();

  environment = environment;

  params:any = {
    origin: 'handle',
    posId: null
    // status: null
  };

  total: number = 0;
  pageOption:any = {
    pageIndex: 1,
    pageSize: 10
  };

  constructor(
    private msg: NzMessageService,
    public settingService: GlobalSettingsService
  ) { }

  ngOnChanges(changes:SimpleChanges):void {
    if(changes.option && this.positionId && this.option && this.option.status) {
      console.log(this.option, 'cccccccccc')
      this.params.posId = this.positionId;
      this.getDataList();
    }
  }

  listOfData:any[] = [];
  loadingData:boolean = false;

  getDataList() {
    const option:any = {
      // status: this.option.resume_status,
      ...this.option,
      job_id: this.positionId,
      limit: this.pageOption.pageSize,
      page: this.pageOption.pageIndex
    };
    this.loadingData = true;

    this.settingService.post(`/v1/web/com/delivery/resume`, option).subscribe( (res:ApiData) => {
      console.log(res, '通过职位获取 在招的简历列表 works, 搜索条件 ==> ', option);
      this.loadingData = false;
      if(res.code === 200) {
        this.listOfData = res.data;
        this.total = res.meta.pagination.total;
        
        this.setOfCheckedId.clear();
        this.refreshCheckedStatus();
      }
    }, err => this.loadingData = false);
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    // const { pageSize, pageIndex } = params;
    // this.pageOption.pageIndex = pageIndex;
    // this.pageOption.pageSize = pageSize;
    if(this.option) {
      this.getDataList();
    }
    
  }

  checked = false;
  indeterminate = false;
  setOfCheckedId = new Set<number>();

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
    console.log(id, checked, '...', this.setOfCheckedId)
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfData.forEach(item => this.updateCheckedSet(item.resume.id, value));
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfData.every(item => this.setOfCheckedId.has(item.resume.id));
    if(this.setOfCheckedId.size === 0) {
      this.checked = false;
    }
    this.indeterminate = this.listOfData.some(item => this.setOfCheckedId.has(item.resume.id)) && !this.checked;
  }

  
  countYears(t:string):string {
    let work_date:string = '';
    if(t) {
      const today:Date = new Date();
      const year = differenceInYears(today, new Date(t));
      work_date = year > 1 ? `${year}年工作经验` : '工作经验不足一年';
    }else {
      work_date = '暂无工作经验'
    }
    return work_date;
  }
  
  countAge(t:string):number { // 计算 t  至今的时间段（多少年）
    const today:Date = new Date();
    const year:number = differenceInYears(today, new Date(t));
    return year;
  }

  // 简历处理  方法 调用   淘汰   不合适  offer  下一阶段等
  submitLoading:boolean = false;
  dealResume():void {
    if(this.submitLoading || this.setOfCheckedId.size === 0) {
      return;
    }
    console.log('处理简历状态, 淘汰用户简历', this.option.resume_status, [...this.setOfCheckedId]);
    const option = {
      job_id: this.positionId,
      ids: [...this.setOfCheckedId]
    };
    this.submitLoading = true;
    this.settingService.post('/v1/web/com/resume/refuse/muti', option).subscribe((res:ApiData) => {
      console.log(res);
      this.submitLoading = false;
      if(res.code === 200) {
        this.msg.success('操作成功');
        this.getDataList();
        this.emit();
      }else {
        this.msg.error(res.message);
      }
    }, err => this.submitLoading = false);
  }
  
  nextStepsIn():void {
    if(this.submitLoading || this.setOfCheckedId.size === 0) {
      return;
    }
    console.log('处理简历状态, 淘汰用户简历', this.option.resume_status, [...this.setOfCheckedId]);
    const option = {
      job_id: this.positionId,
      status: this.option.resume_status,
      ids: [...this.setOfCheckedId]
    };
    this.submitLoading = true;
    this.settingService.post('/v1/web/com/resume/status/muti', option).subscribe((res:ApiData) => {
      console.log(res);
      this.submitLoading = false;
      if(res.code === 200) {
        this.msg.success('操作成功');
        this.getDataList();
        this.emit();
      }else {
        this.msg.error(res.message);
      }
    }, err => this.submitLoading = false);
  }

  emit():void { // 更新父组件 各个状态下简历的数量
    this.totalConfigChange.emit();
  }
}
