import { Component, OnInit, Input, OnChanges, ViewContainerRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { PositionFormComponent } from '../position-form/position-form.component';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CompanyDataService } from '../../../service/company-data.service';

@Component({
  selector: 'app-position-list-c',
  templateUrl: './position-list-c.component.html',
  styleUrls: ['./position-list-c.component.less']
})
export class PositionListCComponent implements OnChanges {
  // @Input() listOfData:any[] = [];
  // @Input() paginationOption:any;
  @Input() searchOption: any;
  @Input() status: string;

  loadingData: boolean = false;

  freshLoadingOption: { [key: number]: boolean } = {};

  confirmModal?: NzModalRef; // For testing by now

  tplModal?: NzModalRef;

  listOfData: any[] = [];

  pageConfig: any = {
    total: 0,
    page_size: 10,
    page: 1
  };

  constructor(
    private modal: NzModalService,
    private msg: NzMessageService,
    private companyDataService: CompanyDataService,
    private settingService: GlobalSettingsService
    // private viewContainerRef: ViewContainerRef
  ) {
    this.settingService.setTitle('职位管理-天府菁英网');
  }

  ngOnChanges(): void {
    if (this.searchOption) {
      this.getDataList();
    }

  }

  getDataList() {
    // /v1/web/com/job
    this.loadingData = true;

    const option = {
      name: this.searchOption ? this.searchOption.name : null,
      status: this.status === 'ing' ? 1 : 2,
      limit: this.pageConfig.page_size,
      page: this.pageConfig.page
    };

    this.settingService.get('/v1/web/com/job', option).subscribe((res: ApiData) => {
      this.loadingData = false;
      this.listOfData = res.data;
      this.pageConfig.total = res.meta.pagination.total;
    }, err => this.loadingData = false);

  }

  checked = false;
  loading = false;
  indeterminate = false;
  listOfCurrentPageData: any[] = [];
  setOfCheckedId = new Set<number>();

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onCurrentPageDataChange(listOfCurrentPageData: any[]): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    //  翻页重新获取数据
    this.refreshCheckedStatus();
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
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

  selectedChange(checked: any, data: any) {
    this.updateCheckedSet(data.id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.listOfData.filter(({ disabled }) => !disabled).forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }


  edit(data: any): void {
    const modal = this.modal.create({
      nzTitle: '修改职位信息',
      nzContent: PositionFormComponent,
      nzWidth: '800px',
      nzBodyStyle: {
        padding: '24px 100px 30px'
      },
      nzMaskClosable: false,
      nzComponentParams: {
        data: data
      },
      nzFooter: null
    });

    modal.afterClose.subscribe(result => {
      if (result) {
        this.getDataList();
      }
    });
  }


  refreshItem(data: any): void {
    // 刷新职位
    this.freshLoadingOption[data.id] = true;
    this.settingService.post(`/v1/web/com/resume/update_jobs`, { ids: [data.id] }).subscribe((res: ApiData) => {
      this.freshLoadingOption[data.id] = false
      if (res.code === 200) {
        this.msg.success('刷新成功');
        this.getDataList();
      } else {
        this.msg.error(res.message);
      }
    }, err => this.freshLoadingOption[data.id] = false);
  }

  refreshAll() { // 批量刷新 /v1/web/com/job/online_muti
    this.loading = true;
    const requestData = this.listOfData.filter(data => this.setOfCheckedId.has(data.id));
    const ids: any = requestData.map(v => v.id);
    this.settingService.post(`/v1/web/com/resume/update_jobs`, { ids: ids }).subscribe((res: ApiData) => {
      this.loading = false
      if (res.code === 200) {
        this.msg.success('刷新成功');
        this.setOfCheckedId.clear();
        this.refreshCheckedStatus();
        this.getDataList();
      } else {
        this.msg.error(res.message);
      }
    }, err => this.loading = false);
  }

  uplineItem(id: number): void {
    this.uplinePositions({ ids: [id] });
  }

  upLineSubmit() {
    const requestData = this.listOfData.filter(data => this.setOfCheckedId.has(data.id));
    const ids: any = requestData.map(v => v.id);
    this.uplinePositions({ ids: ids });
  }
  uplinePositions(opt: any): void {
    this.loading = true;
    this.settingService.post(`/v1/web/com/resume/online_jobs`, opt).subscribe((res: ApiData) => {
      this.loading = false;
      if (res.code === 200) {
        this.msg.success('职位上线成功');
        this.setOfCheckedId.clear();
        this.refreshCheckedStatus();
        this.getDataList();
        this.companyDataService.getPositionConfig().then();
      } else {
        this.msg.error(res.message);
      }
    }, err => this.loading = false);
  }

  deletedPositions(opt: any): void {
    this.deletedLoading = true;
    this.settingService.post(`/v1/web/com/resume/delete_jobs`, opt).subscribe((res: ApiData) => {
      this.deletedLoading = false;
      if (res.code === 200) {
        this.msg.success('职位删除成功');
        this.isVisible = false;
        this.delPositionId = null;
        this.setOfCheckedId.clear();
        this.refreshCheckedStatus();
        this.getDataList();
        this.companyDataService.getPositionConfig().then();
      } else {
        this.msg.error(res.message);
      }
    }, err => this.deletedLoading = false);
  }

  disabled(id: number): void {
    this.disabledPositions({ ids: [id] });
  }
  disabledAll(): void {
    const requestData = this.listOfData.filter(data => this.setOfCheckedId.has(data.id));
    const ids: any = requestData.map(v => v.id);
    this.disabledPositions({ ids: ids });
  }

  disabledPositions(opt: any): void {
    this.settingService.post(`/v1/web/com/resume/offline_jobs`, opt).subscribe((res: ApiData) => {
      if (res.code === 200) {
        this.msg.success('职位下线成功');
        this.setOfCheckedId.clear();
        this.refreshCheckedStatus();
        this.getDataList();
        this.companyDataService.getPositionConfig().then();
      } else {
        this.msg.error(res.message);
      }
    });
  }

  isVisible: boolean = false;
  delPositionId: any = null;

  showModal(id?: number): void {
    this.isVisible = true;
    if (id) {
      this.delPositionId = id;
    }
  }

  handleOk(): void {
    // 删除职位
    if (this.isVisible && this.delPositionId) {
      this.deletedPositions({ ids: [this.delPositionId] });
    } else {
      const requestData = this.listOfData.filter(data => this.setOfCheckedId.has(data.id));
      const ids: any = requestData.map(v => v.id);
      this.deletedPositions({ ids: ids });
    }
  }

  deletedLoading: boolean = false;

  handleCancel(): void {
    this.isVisible = false;
    this.delPositionId = null;
  }
  cancel(): void { }
}
