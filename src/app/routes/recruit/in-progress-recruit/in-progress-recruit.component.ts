import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserDataService } from '../../user-admin/service/user-data.service';
import { UserLoginComponent } from 'src/app/shared/component/login/user-login/user-login.component';
import { PostDeliverySuccessComponent } from 'src/app/shared/component/position-apply/post-delivery-success/post-delivery-success.component';
import { CelebrityNotPassComponent } from 'src/app/shared/component/position-apply/celebrity-not-pass/celebrity-not-pass.component';
import { ResumesListShowCComponent } from 'src/app/shared/component/position-apply/resumes-list-show-c/resumes-list-show-c.component';
import { RightSidebarJobHistoryComponent } from './../component/right-sidebar-job-history/right-sidebar-job-history.component';


@Component({
  selector: 'app-in-progress-recruit',
  templateUrl: './in-progress-recruit.component.html',
  styleUrls: ['./in-progress-recruit.component.less']
})
export class InProgressRecruitComponent implements OnInit {

  list: any[] = []; // 数据列表
  loadingData: boolean = true;
  total: number = 0;
  limit: number = 10;
  pageIndex: number = 1;

  constructor(
    private modal: NzModalService,
    private msg: NzMessageService,
    public settingService: GlobalSettingsService,
    private userDataService: UserDataService
  ) {
    this.settingService.setTitle('招聘中职位-天府菁英网');
  }

  ngOnInit(): void {
    this.getDataList();
  }

  @ViewChild('historyRecordC', { static: false }) historyRecordC: RightSidebarJobHistoryComponent;

  viewPosition(id: number) {
    const url: string = `/recruit/details/${id}`;
    window.open(url, '_blank');
    setTimeout(() => {
      this.historyRecordC.getDataList();
    }, 3000);
  }

  searchOption: any = {
    name: null,
    city_id: null
  };
  searchOptionChange(option: any): void {
    this.searchOption = option;
    this.pageIndex = 1;
    this.getDataList();
  }

  getDataList(): void {
    this.loadingData = true;

    const option: any = {
      name: this.searchOption['keywords'] ? this.searchOption['keywords'] : null,
      city_id: +this.searchOption['city_id'],
      limit: this.limit,
      page: this.pageIndex
    };
    this.settingService.get(`/v1/web/jobs`, option).subscribe((res: ApiData) => {
      this.loadingData = false;
      if (res.code === 200) {
        this.list = res.data;
        if (this.total === 0) {
          this.total = res.meta.pagination.total;
        }

        this.pageIndex = res.meta.pagination.current_page;
        this.setOfCheckedId.clear();
        this.refreshCheckedStatus();
        this.checked = false;
      }
    }, err => this.loadingData = false)
  }

  pageIndexChange({ page }): void {
    this.pageIndex = page;
    this.getDataList();
  }

  checked = false;
  loading = false;
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
    const listOfEnabledData = this.list.filter(({ is_delivery }) => !is_delivery);
    this.checked = listOfEnabledData.every(({ id }) => this.setOfCheckedId.has(id));
    this.indeterminate = listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
  }

  selectedChange(checked: any, data: any) {
    this.updateCheckedSet(data.id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.list.filter(({ is_delivery }) => !is_delivery).forEach(({ id }) => this.updateCheckedSet(id, checked));
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
        // this.msg.warning('您还未通过实名认证，请前往个人中心完善实名认证信息');
        this.celebrityNotPass();
      } else {
        this.chooseResumePost();
      }
    } else {
      this.userDataService.getProfile().then(data => {
        if (data.status !== 1) {
          // this.msg.warning('您还未通过实名认证，请前往个人中心完善实名认证信息');

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
        ids: ids
      },
      nzFooter: null
    });
    resumeModal.afterClose.subscribe(result => {
      if (result && result.type === 'success') {
        this.postSuccess();
        this.getDataList();
      }
    });

  }

  loginModal: any = null;
  successModal: any = null;
  userCelebrityModal: any = null;
  createUserModal() {
    this.loginModal = this.modal.create({
      nzTitle: null,
      nzContent: UserLoginComponent,
      nzMaskClosable: false,
      nzWidth: 455,
      nzStyle: { top: '250px' },
      nzFooter: null
    });

  }
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
  }

}
