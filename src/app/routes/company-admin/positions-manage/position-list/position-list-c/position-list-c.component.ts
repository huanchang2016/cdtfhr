import { Component, OnInit, Input, OnChanges, ViewContainerRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { PositionFormComponent } from '../position-form/position-form.component';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-position-list-c',
  templateUrl: './position-list-c.component.html',
  styleUrls: ['./position-list-c.component.less']
})
export class PositionListCComponent implements OnChanges {
  // @Input() listOfData:any[] = [];
  // @Input() paginationOption:any;
  @Input() searchOption:any;
  @Input() status:string;

  loadingData:boolean = false;

  freshLoadingOption:{[key:number]: boolean} = {};

  confirmModal?: NzModalRef; // For testing by now
  
  tplModal?: NzModalRef;

  listOfData:any[] = [];

  pageConfig:any = {
    total: 0,
    page_size: 10,
    page: 1
  };

  constructor(
    private modal: NzModalService,
    private msg: NzMessageService,
    private settingService: GlobalSettingsService
    // private viewContainerRef: ViewContainerRef
  ) { }

  ngOnChanges(): void {
    if(this.searchOption) {
      console.log(this.searchOption, 'this. search options')
      this.getDataList();
    }
    
  }

  getDataList() {
    // /v1/web/com/job
    this.loadingData = true;

    const option = {
      name: this.searchOption ? this.searchOption.name : null,
      status: this.status === 'ing' ? 1 : 0,
      limit: this.pageConfig.page_size,
      page: this.pageConfig.page
    };

    this.settingService.get('/v1/web/com/job', option).subscribe((res: ApiData) => {
      console.log('getDataList', res);
      this.loadingData = false;
      this.listOfData = res.data;
      this.pageConfig.total = res.meta.pagination.total;
    }, err => this.loadingData = false);

  }

  checked = false;
  loading = false;
  indeterminate = false;
  listOfCurrentPageData:any[] = [];
  setOfCheckedId = new Set<number>();

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
    console.log(this.setOfCheckedId);
  }

  onCurrentPageDataChange(listOfCurrentPageData: any[]): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    //  翻页重新获取数据
    this.refreshCheckedStatus();
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params, 'params');
    const { pageSize, pageIndex } = params;
    
    this.pageConfig['page_size'] = pageSize;
    this.pageConfig['page'] = pageIndex;

    this.getDataList();
  }


  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfData.filter(({ disabled }) => !disabled);
    this.checked = listOfEnabledData.every(({ id }) => this.setOfCheckedId.has(id));
    this.indeterminate = listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
  }

  selectedChange(checked:any, data:any) {
    console.log('checkbox change', checked, data);
    this.updateCheckedSet(data.id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.listOfData.filter(({ disabled }) => !disabled).forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }


  edit(data:any): void {
    console.log('create position');
    const modal = this.modal.create({
      nzTitle: '修改职位信息',
      nzContent: PositionFormComponent,
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
      nzFooter: null
    });

    // const instance = modal.getContentComponent();
    // modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    modal.afterClose.subscribe(result => {
      console.log('result', result);
      if(result) {
        this.getDataList();
      }
    });
  }

  showConfirm(id?:number): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: '是否将此招聘信息删除？',
      nzContent: '删除后，职位下对应接收的简历也会被删除。加入收藏夹的除外',
      nzOkType: 'danger',
      nzOnOk: () => {
        if(id) {
          this.deletedPositions({ ids: [id]});
        }else {
          const requestData = this.listOfData.filter(data => this.setOfCheckedId.has(data.id));
          const ids:any = requestData.map( v => v.id);
          this.deletedPositions({ids: ids});
        }
      },
      nzOnCancel: () => {}
    });
  }

  refreshItem(data:any):void {
    // 刷新职位
    this.freshLoadingOption[data.id] = true;
    this.settingService.post(`/v1/web/com/resume/update_jobs`, { ids: [data.id] }).subscribe((res:ApiData) => {
      this.freshLoadingOption[data.id] = false
      console.log(res);
      if(res.code === 200) {
        this.msg.success('刷新成功');
        this.getDataList();
      }
    }, err => this.freshLoadingOption[data.id] = false);
  }

  refreshAll() { // 批量刷新 /v1/web/com/job/online_muti
    this.loading = true;
    const requestData = this.listOfData.filter(data => this.setOfCheckedId.has(data.id));
    console.log('selected item data: 批量刷新', requestData);
    const ids:any = requestData.map( v => v.id);
    this.settingService.post(`/v1/web/com/resume/update_jobs`, { ids: ids }).subscribe((res:ApiData) => {
      this.loading = false
      console.log(res);
      if(res.code === 200) {
        this.msg.success('刷新成功');
        this.setOfCheckedId.clear();
        this.refreshCheckedStatus();
        this.getDataList();
      }
    }, err => this.loading = false);
  }

  uplineItem(id:number):void {
    this.uplinePositions({ids: [id]});
  }

  upLineSubmit() {
    const requestData = this.listOfData.filter(data => this.setOfCheckedId.has(data.id));
    const ids:any = requestData.map( v => v.id);
    this.uplinePositions({ids: ids});
  }
  uplinePositions(opt:any):void {
    this.loading = true;
    this.settingService.post(`/v1/web/com/resume/online_jobs`, opt).subscribe((res:ApiData) => {
      console.log(res);
      this.loading = false;
      if(res.code === 200) {
        this.msg.success('职位上线成功');
        this.setOfCheckedId.clear();
        this.refreshCheckedStatus();
        this.getDataList();
      }
    }, err => this.loading = false);
  }

  deletedPositions(opt:any):void {
    console.log('批量删除职位');
    this.settingService.post(`/v1/web/com/resume/delete_jobs`, opt).subscribe((res:ApiData) => {
      console.log(res);
      if(res.code === 200) {
        this.msg.success('职位删除成功');
        this.setOfCheckedId.clear();
        this.refreshCheckedStatus();
        this.getDataList();
      }
    });
  }

  disabled(id:number):void {
    console.log('下线职位 id', id);
    this.disabledPositions({ids: [id]});
  }
  disabledAll():void {
    const requestData = this.listOfData.filter(data => this.setOfCheckedId.has(data.id));
    const ids:any = requestData.map( v => v.id);
    this.disabledPositions({ids: ids});
  }

  disabledPositions(opt:any):void {
    console.log('批量下线职位');
    this.settingService.post(`/v1/web/com/resume/offline_jobs`, opt).subscribe((res:ApiData) => {
      console.log(res);
      if(res.code === 200) {
        this.msg.success('职位下线成功');
        this.setOfCheckedId.clear();
        this.refreshCheckedStatus();
        this.getDataList();
      }
    });
  }

  cancel():void {}
}
