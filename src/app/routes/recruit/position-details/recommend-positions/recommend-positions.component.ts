import { Component, Input, OnChanges } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { PostDeliverySuccessComponent } from 'src/app/shared/component/position-apply/post-delivery-success/post-delivery-success.component';
import { CelebrityNotPassComponent } from 'src/app/shared/component/position-apply/celebrity-not-pass/celebrity-not-pass.component';

import { GlobalSettingsService } from '@core';
import { UserLoginComponent } from 'src/app/shared/component/login/user-login/user-login.component';
import { ResumesListShowCComponent } from 'src/app/shared/component/position-apply/resumes-list-show-c/resumes-list-show-c.component';

import { ApiData } from 'src/app/data/interface';
import { UserDataService } from 'src/app/routes/user-admin/service/user-data.service';

@Component({
  selector: 'app-recommend-positions',
  templateUrl: './recommend-positions.component.html',
  styleUrls: ['./recommend-positions.component.less']
})
export class RecommendPositionsComponent implements OnChanges {
  @Input() positionId: number;

  list: any[] = [];

  loadingData: boolean = false; // 更新状态（换一批）

  requestLoading: boolean = false; // 投递状态

  pageIndex: number = 1;
  totalPage: number = 1;

  constructor(
    private modal: NzModalService,
    private msg: NzMessageService,
    public settingService: GlobalSettingsService,
    private userDataService: UserDataService
  ) { }

  ngOnChanges(): void {
    if (this.positionId) {
      this.getDataList();
    }
  }

  getDataList(): void {
    this.loadingData = true;
    this.settingService.get(`/v1/web/jobs/recommend/${this.positionId}?limit=6&page=${this.pageIndex}`).subscribe((res: ApiData) => {
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
    this.updateCheckedSet(data.id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.list.filter(({ disabled }) => !disabled).forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

  sendRequest(): void {
    if (this.settingService.user) {
      if (this.settingService.user.type === 'user') {
        this.checkCelebrity();
      } else {
        this.msg.error('企业用户不能投递岗位');
      }
    } else {
      // 未登录，弹出登录框
      this.createUserModal();
    }

  }

  checkCelebrity(): void { // 验证用户是否已实名审核
    if (this.userDataService.userProfile) {
      if (this.userDataService.userProfile.status !== 1) {
        this.celebrityNotPass();
      } else {
        this.chooseResumePost();
      }
    } else {
      this.userDataService.getProfile().then(data => {
        if (data.status !== 1) {

          this.celebrityNotPass();
        } else {
          this.chooseResumePost();
        }
      })
    }

  }
  chooseResumePost() {
    const ids: number[] = this.list.filter(data => this.setOfCheckedId.has(data.id)).map(v => v.id);
    if (ids.length === 0) {
      this.msg.warning('未选择职位');
      return;
    }
    const resumeModal = this.modal.create({
      nzTitle: '选择投递简历',
      nzContent: ResumesListShowCComponent,
      nzMaskClosable: false,
      nzWidth: 455,
      nzStyle: { top: '250px' },
      nzComponentParams: {
        positionId: this.positionId,
        ids: ids
      },
      nzFooter: null
    });
    // Return a result when closed
    resumeModal.afterClose.subscribe(result => {
      if (result && result.type === 'success') {
        this.postSuccess();
        this.getDataList();
      }
    });

  }

  createUserModal() {
    this.loginModal = this.modal.create({
      nzTitle: null,
      nzContent: UserLoginComponent,
      nzMaskClosable: false,
      nzWidth: 455,
      nzStyle: { top: '250px' },
      nzFooter: null
    });
    // Return a result when closed

  }

  loginModal: any = null;
  successModal: any = null;
  userCelebrityModal: any = null;
  // 简历投递成功
  postSuccess() {
    this.successModal = this.modal.create({
      nzTitle: null,
      nzContent: PostDeliverySuccessComponent,
      nzMaskClosable: false,
      nzWidth: 455,
      nzStyle: { top: '250px' },
      nzFooter: null
    });
    this.successModal.afterOpen.subscribe(() => { });
    // Return a result when closed
    this.successModal.afterClose.subscribe(result => {
      if (result && result.type === 'success') {

      }
    });
  }

  // 未通过实名认证
  celebrityNotPass() {
    this.userCelebrityModal = this.modal.create({
      nzTitle: null,
      nzContent: CelebrityNotPassComponent,
      nzMaskClosable: false,
      nzWidth: 455,
      nzStyle: { top: '250px' },
      nzFooter: null
    });
    this.userCelebrityModal.afterOpen.subscribe(() => { });
    // Return a result when closed
    this.userCelebrityModal.afterClose.subscribe(result => {
      if (result && result.type === 'success') {
        // nothing to do .
      }
    });
  }

}
