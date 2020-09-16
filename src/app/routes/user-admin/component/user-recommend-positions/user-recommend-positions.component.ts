import { Component, OnInit } from '@angular/core';
import { GlobalSettingsService } from '@core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ApiData } from 'src/app/data/interface';
import { ResumesListShowCComponent } from 'src/app/shared/component/position-apply/resumes-list-show-c/resumes-list-show-c.component';
import { PostDeliverySuccessComponent } from 'src/app/shared/component/position-apply/post-delivery-success/post-delivery-success.component';
import { UserDataService } from '../../service/user-data.service';

@Component({
  selector: 'app-user-recommend-positions',
  templateUrl: './user-recommend-positions.component.html',
  styleUrls: ['./user-recommend-positions.component.less']
})
export class UserRecommendPositionsComponent implements OnInit {


  list: any[] = [];

  loadingData: boolean = false; // 更新状态（换一批）

  requestLoading: boolean = false; // 投递状态

  pageIndex: number = 1;
  totalPage: number = 1;


  constructor(
    private modal: NzModalService,
    private settingService: GlobalSettingsService,
    private userDataService: UserDataService,
    private msg: NzMessageService
  ) { }

  ngOnInit() {
    this.getDataList();
  }

  getDataList(): void {
    this.loadingData = true;
    this.settingService.get(`/v1/web/user/recommend_jobs?limit=6&page=${this.pageIndex}`).subscribe((res: ApiData) => {
      console.log(res, '获取推荐职位');
      this.loadingData = false;
      if (res.code === 200) {
        this.list = res.data;
        this.totalPage = res.meta.pagination.total_pages;
        this.setOfCheckedId.clear();
        this.refreshCheckedStatus();
        this.requestLoading = false;
      }

    }, err => this.loadingData = false);
  }

  updateList(): void {
    if (this.pageIndex < this.totalPage) {
      this.pageIndex++;
    } else {
      this.pageIndex = 1;
    }
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

  onCurrentPageDataChange(): void {
    //  翻页重新获取数据
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    const listOfEnabledData = this.list.filter(({ disabled }) => !disabled);
    this.checked = listOfEnabledData.every(({ id }) => this.setOfCheckedId.has(id));
    this.indeterminate = listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
  }

  selectedChange(checked: any, data: any) {
    console.log('checkbox change', checked, data);
    this.updateCheckedSet(data.id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.list.filter(({ disabled }) => !disabled).forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

  sendRequest(): void {
    const ids: number[] = this.list.filter(data => this.setOfCheckedId.has(data.id)).map(v => v.id);
    if (ids.length === 0) {
      this.msg.warning('未选择职位');
      return;
    }
    this.chooseResumePost(ids);
  }

  chooseResumePost(ids: number[]) {
    const resumeModal = this.modal.create({
      nzTitle: '选择投递简历',
      nzContent: ResumesListShowCComponent,
      nzMaskClosable: false,
      nzWidth: 455,
      nzStyle: { top: '250px' },
      // nzViewContainerRef: this.viewContainerRef,
      // nzGetContainer: () => document.body,
      nzComponentParams: {
        // positionId: this.positionId,
        ids: ids
      },
      // nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
      nzFooter: null
    });
    // const instance = this.resumeModal.getContentComponent();
    // this.resumeModal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    resumeModal.afterClose.subscribe(result => {
      console.log(result, 'close modal')
      if (result && result.type === 'success') {
        // 投递成功后， 更新  投递记录数据统计
        this.userDataService.getProfile().then();
        this.postSuccess();
        this.getDataList();
      }
    });

  }

  successModal: any = null;
  // 简历投递成功
  postSuccess() {
    this.successModal = this.modal.create({
      nzTitle: null,
      nzContent: PostDeliverySuccessComponent,
      nzMaskClosable: false,
      nzWidth: 455,
      nzStyle: { top: '250px' },
      // nzViewContainerRef: this.viewContainerRef,
      // // nzGetContainer: () => document.body,

      // nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
      nzFooter: null
    });
    // const instance = this.successModal.getContentComponent();
    // this.successModal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    // this.successModal.afterClose.subscribe(result => {
    //   if (result && result.type === 'success') {

    //   }
    // });
  }
}
