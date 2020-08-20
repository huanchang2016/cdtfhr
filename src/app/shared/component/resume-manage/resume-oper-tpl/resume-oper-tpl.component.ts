import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { OperDownloadModalComponent } from './oper-download-modal/oper-download-modal.component';
import { OperSendModalComponent } from './oper-send-modal/oper-send-modal.component';
import { OperCollectModalComponent } from './oper-collect-modal/oper-collect-modal.component';
import { OperSaveModalComponent } from './oper-save-modal/oper-save-modal.component';
import { OperRemarkModalComponent } from './oper-remark-modal/oper-remark-modal.component';

@Component({
  selector: 'app-resume-oper-tpl',
  templateUrl: './resume-oper-tpl.component.html',
  styleUrls: ['./resume-oper-tpl.component.less']
})
export class ResumeOperTplComponent implements OnInit {
  @Input() resumeInfo:any;

  constructor(
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit(): void {
    console.log('resumeInfo oper component works!', this.resumeInfo);
  }

  viewOperRecord():void {
    console.info('查看当前简历的操作记录');
  }
  viewRemarks():void {
    console.info('查看当前简历的 更多备注记录');
  }
  // 简历操作按钮功能（弹出框）

  download(): void { // 下载
    const modal = this.modal.create({
      nzTitle: '下载简历',
      nzContent: OperDownloadModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzWidth: '800px',
      // nzBodyStyle: {
      //   padding: '24px 100px 30px'
      // },
      nzMaskClosable: false,
      nzComponentParams: {
        resumeInfo: this.resumeInfo
      },
      nzFooter: null
    });
    // modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    modal.afterClose.subscribe(result => console.log('[afterClose 下载modal] The result is:', result));

  }

  send(): void { // 转发
    const modal = this.modal.create({
      nzTitle: '提示',
      nzContent: OperSendModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        resumeInfo: this.resumeInfo
      },
      nzFooter: null
    });
    // modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    modal.afterClose.subscribe(result => console.log('[afterClose 转发modal] The result is:', result));

  }

  save(): void { // 保存
    const modal = this.modal.create({
      nzTitle: '提示',
      nzContent: OperSaveModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        resumeInfo: this.resumeInfo
      },
      nzFooter: null
    });
    // modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    modal.afterClose.subscribe(result => console.log('[afterClose 转发modal] The result is:', result));

  }

  collect(): void { // 收藏
    const modal = this.modal.create({
      nzTitle: '提示',
      nzContent: OperCollectModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        resumeInfo: this.resumeInfo
      },
      nzFooter: null
    });
    // modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    modal.afterClose.subscribe(result => console.log('[afterClose 转发modal] The result is:', result));

  }

  remark(): void { // 备注
    const modal = this.modal.create({
      nzTitle: '备注',
      nzContent: OperRemarkModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzWidth: '800px',
      // nzBodyStyle: {
      //   padding: '24px 100px 30px'
      // },
      nzComponentParams: {
        resumeInfo: this.resumeInfo
      },
      nzFooter: null
    });
    // modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    modal.afterClose.subscribe(result => console.log('[afterClose 转发modal] The result is:', result));

  }

}
