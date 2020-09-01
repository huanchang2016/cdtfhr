import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { environment } from '@env/environment';
import { differenceInYears } from 'date-fns';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.less']
})
export class ListItemsComponent implements OnChanges {
  @Input() itemType:string;
  @Input() option:any;

  environment = environment;

  params:any = {
    origin: 'handle',
    posId: null
  };

  pageOption:any = {
    total: 0,
    pageIndex: 1,
    pageSize: 2
  };

  constructor(
    public settingService: GlobalSettingsService
  ) { }

  ngOnChanges(changes:SimpleChanges):void {
    console.log('changes', this.option, changes)
    if(changes.option && this.option.position_id) {
      this.getDataList();
    }
  }

  listOfData:any[] = [];
  loadingData:boolean = false;

  getDataList(total: number = 10) {
    if(this.loadingData) {
      return false;
    }
    this.params.posId = this.option['position_id'];
    console.log(this.params, 'params');
    
    const option:any = {
      status: this.option.resume_status,
      job_id: this.option.position_id,
      limit: this.pageOption.pageSize,
      page: this.pageOption.pageIndex
    };
    this.loadingData = true;

    this.settingService.get(`/v1/web/com/delivery/resume`, option).subscribe( (res:ApiData) => {
      console.log(res, '通过职位获取 在招的简历列表 works');
      this.loadingData = false;
      if(res.code === 200) {
        this.listOfData = res.data;
        this.pageOption.total = res.meta.pagination.total;
        
        this.setOfCheckedId.clear();
        this.refreshCheckedStatus();
      }
    }, err => this.loadingData = false)

    // setTimeout(() => {
    //   this.loadingData = false;
    //   this.listOfData = [
    //     { id: 1, name: '张三1' },
    //     { id: 2, name: '张三2' },
    //     { id: 3, name: '张三3' },
    //     { id: 4, name: '张三4' },
    //     { id: 5, name: '张三5' },
    //     { id: 6, name: '张三6' }
    //   ];
    //   console.log(this.listOfData, 'list')

    // }, 2000);
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex } = params;
    this.pageOption.pageIndex = pageIndex;
    this.pageOption.pageSize = pageSize;
    
    this.getDataList();
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
    this.listOfData.forEach(item => this.updateCheckedSet(item.id, value));
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfData.every(item => this.setOfCheckedId.has(item.id));
    if(this.setOfCheckedId.size === 0) {
      this.checked = false;
    }
    this.indeterminate = this.listOfData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
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

  dealResume():void {
    console.log('处理简历状态, 当前状态为', this.option.resume_status);
  }
}
