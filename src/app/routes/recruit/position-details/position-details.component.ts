import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { PostDeliverySuccessComponent } from 'src/app/shared/component/position-apply/post-delivery-success/post-delivery-success.component';
import { CelebrityNotPassComponent } from 'src/app/shared/component/position-apply/celebrity-not-pass/celebrity-not-pass.component';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';
import { environment } from '@env/environment';
import { UserDataService } from '../../user-admin/service/user-data.service';
import { UserLoginComponent } from 'src/app/shared/component/login/user-login/user-login.component';
import { ResumesListShowCComponent } from 'src/app/shared/component/position-apply/resumes-list-show-c/resumes-list-show-c.component';

@Component({
  selector: 'app-position-details',
  templateUrl: './position-details.component.html',
  styleUrls: ['./position-details.component.less']
})
export class PositionDetailsComponent implements OnInit {
  
  environment = environment;

  positionId:number = null;

  status: 0 | 1 = 0; // 状态， 标记当前用户是否已经投递了该简历  0  未投递， 1 已投递

  info:any = null;
  loadingData: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private modal: NzModalService,
    private msg: NzMessageService,
    private router: Router,
    public settingService: GlobalSettingsService,
    private userDataService: UserDataService
  ) {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.positionId = +params['id'];
      this.getData();
    });
  }

  ngOnInit(): void {
    if(this.settingService.user) {
      this.getStatus();
    }
  }
  getStatus():void {
    this.settingService.get(`/v1/web/user/delivery_job/${this.positionId}`).subscribe((res:ApiData) => {
      console.log(res, 'resume status post ');
      this.status = res.data.status;
    })
  }

  getData() {
    this.settingService.get(`/v1/web/jobs/${this.positionId}`).subscribe((res:ApiData) => {
      console.log(res, 'get Position details Data');
      this.loadingData = false;
      this.info = res.data;
    });
    
    
  }

  applyPosition() {
    console.log('申请职位， 岗位投递', this.positionId);
    //  先判断用户是否登录
    //    已登录： 再判断，登录用户是否已经通过实名认证 ，需要实名认证之后才可以投递简历
    //    未登录： xian denglu 
    if(this.settingService.user) {
      if(this.settingService.user.type === 'user') {
        this.checkCelebrity();
      }else {
        this.msg.error('企业用户不能投递岗位');
      }
    }else {
      // 未登录，弹出登录框
      this.createUserModal();
    }
    
  }

  checkCelebrity():void { // 验证用户是否已实名审核
    if(this.userDataService.userProfile) {
      if(this.userDataService.userProfile.status !== 1) {
        // this.msg.warning('您还未通过实名认证，请前往个人中心完善实名认证信息');
        console.log('user xxxxxxxxxxxx')
        this.celebrityNotPass();
      }else {
        console.log('yi denglu ,  jinru toudi jianli liucheng');
        this.chooseResumePost();
      }
    }else {
      this.userDataService.getProfile().then( data => {
        if(data.status !== 1) {
          // this.msg.warning('您还未通过实名认证，请前往个人中心完善实名认证信息');
        console.log('user uyyyyyyyyyyyyyyyyyy')

          this.celebrityNotPass();
        }else {
          console.log('yi denglu ,  jinru toudi jianli liucheng..............');
          this.chooseResumePost();
        }
      })
    }
    
  }
  chooseResumePost() {
    // ResumesListShowCComponent
    const resumeModal = this.modal.create({
      nzTitle: '选择投递简历',
      nzContent: ResumesListShowCComponent,
      nzWidth: 455,
      nzStyle: { top: '250px' },
      // nzViewContainerRef: this.viewContainerRef,
      // nzGetContainer: () => document.body,
      nzComponentParams: {
        positionId: this.positionId,
      },
      // nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
      nzFooter: null
    });
    // const instance = this.resumeModal.getContentComponent();
    // this.resumeModal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    resumeModal.afterClose.subscribe( result => {
      console.log(result, 'close modal')
      if(result && result.type === 'success') {
        this.getStatus();
        this.postSuccess();
      }
    } );

  }

  createUserModal () {
    this.loginModal = this.modal.create({
      nzTitle: null,
      nzContent: UserLoginComponent,
      nzWidth: 455,
      nzStyle: { top: '250px' },
      // nzViewContainerRef: this.viewContainerRef,
      // nzGetContainer: () => document.body,
      
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
      nzFooter: null
    });
    // const instance = this.loginModal.getContentComponent();
    // this.loginModal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    this.loginModal.afterClose.subscribe( result =>  console.log(result, 'close modal') );

  }

  

  loginModal:any = null;
  successModal:any = null;
  userCelebrityModal:any = null;
  // 简历投递成功
  postSuccess() {
    this.successModal = this.modal.create({
      nzTitle: null,
      nzContent: PostDeliverySuccessComponent,
      nzWidth: 455,
      nzStyle: { top: '250px' },
      // nzViewContainerRef: this.viewContainerRef,
      // // nzGetContainer: () => document.body,
      
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
      nzFooter: null
    });
    // const instance = this.successModal.getContentComponent();
    // this.successModal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    // this.successModal.afterClose.subscribe( result => {
      // if(result && result.type === 'success') {
        // 投递成功，则修改 按钮的投递状态
        // this.msg.success('职位投递成功');
      // }
    // });
  }

  // 未通过实名认证
  celebrityNotPass() {
    this.userCelebrityModal = this.modal.create({
      nzTitle: null,
      nzContent: CelebrityNotPassComponent,
      nzWidth: 455,
      nzStyle: { top: '250px' },
      // nzViewContainerRef: this.viewContainerRef,
      // // nzGetContainer: () => document.body,
      
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
      nzFooter: null
    });
    const instance = this.userCelebrityModal.getContentComponent();
    this.userCelebrityModal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    this.userCelebrityModal.afterClose.subscribe( result => {
      if(result && result.type === 'success') {
        // nothing to do .
      }
    });
  }

}
