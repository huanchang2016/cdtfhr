import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { GlobalSettingsService } from '@core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DeliveryStatusTplComponent } from '../component/delivery-status-tpl/delivery-status-tpl.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ApiData } from 'src/app/data/interface';
import { format } from 'date-fns';
import { UserDataService } from '../../service/user-data.service';

@Component({
  selector: 'app-delivery-record-list',
  templateUrl: './delivery-record-list.component.html',
  styleUrls: ['./delivery-record-list.component.less']
})
export class DeliveryRecordListComponent implements OnInit {
  private router$: Subscription;

  tabs: any[] = [
    {
      key: 'record',
      tab: '已投递'
    },
    {
      key: 'viewed',
      tab: '被查看'
    }
  ];

  pos = 0;

  constructor(
    private modal: NzModalService,
    private router: Router,
    private fb: FormBuilder,
    public settingService: GlobalSettingsService,
    private msg: NzMessageService,
    public userDataService: UserDataService
  ) {
    this.settingService.setTitle('职位投递记录-我的投递-个人中心-天府菁英网');
  }

  ngOnInit(): void {
    this.router$ = this.router.events.pipe(filter(e => e instanceof ActivationEnd)).subscribe(() => this.setActive());
    this.setActive();

    this.validateForm = this.fb.group({
      // rangeDate: [null],
      start: [null],
      end: [null],
      work_address: [null],
      status: [null]
    });
  }

  private setActive() {
    const key = this.router.url.substr(this.router.url.lastIndexOf('/') + 1);
    const idx = this.tabs.findIndex(w => w.key === key);
    if (idx !== -1) {
      this.pos = idx;
    }
  }

  to(key: string) {
    this.router.navigateByUrl(`/admin/user/delivery/${key}`);
  }

  ngOnDestroy() {
    this.router$.unsubscribe();
  }


  is_more: boolean = false; // 展开更多搜索条件

  validateForm!: FormGroup;

  search_text: string = '';

  loadingData: boolean = true;
  listOfData: any[] = [];

  search():void {
    this.getDataList();
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    console.log(this.validateForm, 'validateForm');
    this.getDataList();
  }

  resetForm(e:MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    this.search_text = '';
    this.getDataList();
  }

  showMoreSearch(): void {
    this.is_more = !this.is_more;
  }

  pageConfig = {
    total: 0,
    limit: 10,
    page: 1
  };

  getDataList(total: number = 10) {
    console.log(this.pageConfig, this.validateForm.value, 'get data list works!', this.search_text);
    const value:any = this.validateForm.value;

    this.loadingData = true;

    // const date:any[] = value.rangeDate;
    const start: string = this.startTimeValue ? format(this.startTimeValue, 'yyyy-MM-dd') : null;
    const end: string = this.endTimeValue ? format(this.endTimeValue, 'yyyy-MM-dd') : null;
    const cascader:any[] = value.work_address;
    const option:any = {
      // 分页参数
      limit: this.pageConfig.limit,
      page: this.pageConfig.page,
      // 搜索表单
      name: this.search_text,
      start: start,
      end: end,
      // type_id: value.company_type,
      // industry_id: value.industry,
      // scale_id: value.scale,
      status: value.status,
      city_id: cascader && cascader.length !== 0 ? cascader[1] : '',
      area_id: cascader && cascader.length !== 0 ? cascader[2] : '',
    };
    console.log('option', option);
    this.settingService.get(`/v1/web/user/delivery/all`, option).subscribe((res:ApiData) => {
      console.log(res, 'data list');
      this.loadingData = false;
      if(res.code === 200) {
        this.listOfData = res.data;
        this.pageConfig.total = res.meta.pagination.total;
      }
    }, err => this.loadingData = false);
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex } = params;
    this.pageConfig['limit'] = pageSize;
    this.pageConfig['page'] = pageIndex;
    this.getDataList();
  }

  showStatus(status:number):string {
    if(status === 0) { // 处理配置项修改，默认为0的情况
      status = 1;
    }
    const _status_name:string = this.settingService.resumeStatus.filter( v => v.id === status)[0].value;
    return _status_name;
  }

  view(data:any):void {
    const modal = this.modal.create({
      nzTitle: '投递进展',
      nzContent: DeliveryStatusTplComponent,
      // nzViewContainerRef: this.viewContainerRef,
      nzWidth: '800px',
      nzBodyStyle: {
        padding: '24px 100px 30px'
      },
      nzMaskClosable: false,
      // nzGetContainer: () => document.body,
      nzComponentParams: {
        data: data
      },
      // nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
      nzFooter: null
    });
    // const instance = modal.getContentComponent();
    // modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    modal.afterClose.subscribe(result => {
      console.log('[afterClose] The result is:', result)
    });
  }


  // 日期搜索组件
  // endOpen = false;

  get endTimeValue(): Date | null {
    return this.validateForm.controls.end.value;
  }
  get startTimeValue(): Date | null {
    return this.validateForm.controls.start.value;
  }
  
  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.endTimeValue) {
      return false;
    }
    return startValue.getTime() > this.endTimeValue.getTime();
  };

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.startTimeValue) {
      return false;
    }
    return endValue.getTime() <= this.startTimeValue.getTime();
  };

  // onStartChange(date: Date): void {
    // this.startTimeValue = date;
  // }

  // onEndChange(date: Date): void {
    // this.endTimeValue = date;
  // }

  // handleStartOpenChange(open: boolean): void {
    // if (!open) {
    //   this.endOpen = true;
    // }
    // console.log('handleStartOpenChange', open, this.endOpen);
  // }

  // handleEndOpenChange(open: boolean): void {
  //   console.log(open);
  //   this.endOpen = open;
  // }

}
