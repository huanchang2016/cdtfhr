import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter, OnInit } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { environment } from '@env/environment';
import { differenceInYears } from 'date-fns';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-list-items-c',
  templateUrl: './list-items-c.component.html',
  styleUrls: ['./list-items-c.component.less']
})
export class ListItemsCComponent implements OnChanges, OnInit {
  // @Input() itemType:string;
  // @Input() option:any;
  // @Input() positionId:number;
  /**
   * status  positionId  itemType  归类到 Config
   * ***/
  @Input() Config: any;
  @Input() loadingData: boolean;
  @Input() listOfData: any[];
  @Input() pageOption: any;
  @Input() Params: string;

  @Output() totalConfigChange: EventEmitter<any> = new EventEmitter();

  @Output() paginationChanges: EventEmitter<any> = new EventEmitter();

  environment = environment;

  params: any = {
    origin: 'handle',
    posId: null
  };

  constructor(
    private msg: NzMessageService,
    public settingService: GlobalSettingsService
  ) { }

  ngOnChanges(): void {
    if (!this.loadingData) {
      this.setOfCheckedId.clear();
      if (this.listOfData.length !== 0) {
        this.refreshCheckedStatus();
      } else {
        this.checked = false;
      }

      this.params_config = {
        ...this.params,
        params: this.Params
      }
    }
  }

  params_config: any = {};

  ngOnInit() {
    this.params.posId = this.Config.positionId;
  }
  // pageIndex
  pageIndexChange(page: number): void {
    this.pageOption.page = page;
    this.paginationChanges.emit({ pageSize: this.pageOption.limit, pageIndex: page })
  }
  pageSizeChange(pageSize: number): void {
    this.paginationChanges.emit({ pageSize: pageSize, pageIndex: this.pageOption.page })
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
    this.indeterminate = this.listOfData.some(item => this.setOfCheckedId.has(item.resume.id)) && !this.checked;
  }


  countYears(t: string): string {
    let work_date: string = '';
    if (t) {
      const today: Date = new Date();
      const year = differenceInYears(today, new Date(t));
      work_date = year > 1 ? `${year}年工作经验` : '工作经验不足一年';
    } else {
      work_date = '暂无工作经验'
    }
    return work_date;
  }

  countAge(t: string): number { // 计算 t  至今的时间段（多少年）
    const today: Date = new Date();
    const year: number = differenceInYears(today, new Date(t));
    return year;
  }

  // 简历处理  方法 调用   淘汰   不合适  offer  下一阶段等
  submitLoading: boolean = false;
  dealResume(): void {
    if (this.setOfCheckedId.size === 0) {
      this.msg.error('选择简历不能为空');
      return;
    }
    if (this.submitLoading) {
      return;
    }
    const option = {
      job_id: this.Config.positionId,
      ids: [...this.setOfCheckedId]
    };
    this.submitLoading = true;
    this.settingService.post('/v1/web/com/resume/refuse/muti', option).subscribe((res: ApiData) => {
      this.submitLoading = false;
      if (res.code === 200) {
        this.msg.success('操作成功');
        this.emit();
      } else {
        this.msg.error(res.message);
      }
    }, err => this.submitLoading = false);
  }

  nextStepsIn(): void {
    if (this.setOfCheckedId.size === 0) {
      this.msg.error('选择简历不能为空');
      return;
    }
    if (this.submitLoading) {
      return;
    }
    const option = {
      job_id: this.Config.positionId,
      status: this.Config.status,
      ids: [...this.setOfCheckedId]
    };
    this.submitLoading = true;
    this.settingService.post('/v1/web/com/resume/status/muti', option).subscribe((res: ApiData) => {
      this.submitLoading = false;
      if (res.code === 200) {
        this.msg.success('操作成功');
        // this.getDataList();
        this.emit();
      } else {
        this.msg.error(res.message);
      }
    }, err => this.submitLoading = false);
  }

  emit(): void { // 更新父组件 各个状态下简历的数量
    this.totalConfigChange.emit();
  }
}
