import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';
import { format } from 'date-fns';
import { UserDataService } from '../../service/user-data.service';

@Component({
  selector: 'app-delivery-viewed-list',
  templateUrl: './delivery-viewed-list.component.html',
  styleUrls: ['./delivery-viewed-list.component.less']
})
export class DeliveryViewedListComponent implements OnInit {
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
    private router: Router,
    private fb: FormBuilder,
    public settingService: GlobalSettingsService,
    public userDataService: UserDataService
  ) {
    this.settingService.setTitle('简历被查看-投递职位列表-我的投递-个人中心-天府菁英网');
    // this.getDataList();
  }

  ngOnInit(): void {
    this.router$ = this.router.events.pipe(filter(e => e instanceof ActivationEnd)).subscribe(() => this.setActive());
    this.setActive();

    this.validateForm = this.fb.group({
      // rangeDate: [null],
      start: [null],
      end: [null],
      industry: [null],
      work_address: [null],
      company_type: [null],
      status: [null],
      scale: [null]
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
      type_id: value.company_type,
      industry_id: value.industry,
      scale_id: value.scale,
      status: value.status,
      city_id: cascader && cascader.length !== 0 ? cascader[1] : '',
      area_id: cascader && cascader.length !== 0 ? cascader[2] : '',
    };
    console.log('option', option);
    this.settingService.post(`/v1/web/user/view_resume_company`, option).subscribe((res:ApiData) => {
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

}
