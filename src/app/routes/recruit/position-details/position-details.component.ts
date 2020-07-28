import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { PostDeliverySuccessComponent } from 'src/app/shared/component/position-apply/post-delivery-success/post-delivery-success.component';
import { CelebrityNotPassComponent } from 'src/app/shared/component/position-apply/celebrity-not-pass/celebrity-not-pass.component';

@Component({
  selector: 'app-position-details',
  templateUrl: './position-details.component.html',
  styleUrls: ['./position-details.component.less']
})
export class PositionDetailsComponent implements OnInit {
  positionId:number = null;

  info:any = null;
  loadingData: boolean = true;

  applyLoading: boolean = false; // 投递职位 状态

  constructor(
    private activatedRoute: ActivatedRoute,
    private modal: NzModalService,
    private msg: NzMessageService
  ) {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.positionId = +params['id'];
      this.getData();
    });
  }

  ngOnInit(): void {
  
  }

  getData() {
    setTimeout(() => {
      this.loadingData = false;
      this.info = {id: 1, name: '张三', is_apply: false };
    }, 1000);
  }

  applyPosition() {
    console.log('申请职位， 岗位投递', this.positionId);

    this.applyLoading = true;
    // setTimeout(() => {
    //   this.applyLoading = false;
    //   this.msg.success('职位投递成功');
    //   this.info['is_apply'] = true;
    // }, 800);

    // this.postSuccess();
    this.celebrityNotPass();
  }

  companyModal:any = null;
  userModal:any = null;
  // 简历投递成功
  postSuccess() {
    this.companyModal = this.modal.create({
      nzTitle: null,
      nzContent: PostDeliverySuccessComponent,
      nzWidth: 455,
      nzStyle: { top: '250px' },
      // nzViewContainerRef: this.viewContainerRef,
      // // nzGetContainer: () => document.body,
      
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
      nzFooter: null
    });
    const instance = this.companyModal.getContentComponent();
    this.companyModal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    this.companyModal.afterClose.subscribe( result => {
      if(result && result.type === 'success') {
        // 投递成功，则修改 按钮的投递状态
        this.applyLoading = false;
        this.msg.success('职位投递成功');
        this.info['is_apply'] = true;
      }
    });
  }

  // 未通过实名认证
  celebrityNotPass() {
    this.userModal = this.modal.create({
      nzTitle: null,
      nzContent: CelebrityNotPassComponent,
      nzWidth: 455,
      nzStyle: { top: '250px' },
      // nzViewContainerRef: this.viewContainerRef,
      // // nzGetContainer: () => document.body,
      
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
      nzFooter: null
    });
    const instance = this.userModal.getContentComponent();
    this.userModal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    this.userModal.afterClose.subscribe( result => {
      if(result && result.type === 'success') {
        // nothing to do .
      }
    });
  }

}
