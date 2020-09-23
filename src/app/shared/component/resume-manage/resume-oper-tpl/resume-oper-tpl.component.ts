import { Component, OnInit, Input, ViewContainerRef, Output, EventEmitter } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { OperDownloadModalComponent } from './oper-download-modal/oper-download-modal.component';
import { OperSendModalComponent } from './oper-send-modal/oper-send-modal.component';
import { OperCollectModalComponent } from './oper-collect-modal/oper-collect-modal.component';
import { OperSaveModalComponent } from './oper-save-modal/oper-save-modal.component';
import { OperRemarkModalComponent } from './oper-remark-modal/oper-remark-modal.component';
import { OperDeliverListTplComponent } from './oper-deliver-list-tpl/oper-deliver-list-tpl.component';
import { OperRecordListTplComponent } from './oper-record-list-tpl/oper-record-list-tpl.component';
import { OperRemarkListTplComponent } from './oper-remark-list-tpl/oper-remark-list-tpl.component';
import { NzIconService } from 'ng-zorro-antd/icon';
import { GlobalSettingsService } from '@core';

@Component({
  selector: 'app-resume-oper-tpl',
  templateUrl: './resume-oper-tpl.component.html',
  styleUrls: ['./resume-oper-tpl.component.less']
})
export class ResumeOperTplComponent implements OnInit {
  @Input() resumeInfo:any;
  @Input() params?:any;
  @Input() configs:any;

  @Output() configEmitChange:EventEmitter<any> = new EventEmitter();
  
  constructor(
    private modal: NzModalService,
    private iconService: NzIconService,
    // private viewContainerRef: ViewContainerRef,
    public settingService: GlobalSettingsService
  ) {
    this.iconService.fetchFromIconfont({
      scriptUrl: 'https://at.alicdn.com/t/font_8d5l8fzk5b87iudi.js'
    });
  }

  ngOnInit(): void {
    console.log('resumeInfo oper component works!', this.resumeInfo);
  }

  logs:any[] = null; // 操作日志
  

  viewOperRecord():void {
    console.info('查看当前简历的操作记录');
    const modal = this.modal.create({
      nzTitle: '操作记录',
      nzContent: OperRecordListTplComponent,
      // nzViewContainerRef: this.viewContainerRef,
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
    // modal.afterClose.subscribe(result => console.log('[afterClose 简历操作记录] The result is:', result));

  }
  viewRemarks():void {
    console.info('查看当前简历的 更多备注记录');
    const modal = this.modal.create({
      nzTitle: '备注记录',
      nzContent: OperRemarkListTplComponent,
      // nzViewContainerRef: this.viewContainerRef,
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
    // modal.afterClose.subscribe(result => console.log('[afterClose 简历备注记录] The result is:', result));

  }
  // 简历操作按钮功能（弹出框）

  download(): void { // 下载
    const modal = this.modal.create({
      nzTitle: '下载简历',
      nzContent: OperDownloadModalComponent,
      // nzViewContainerRef: this.viewContainerRef,
      nzWidth: '800px',
      nzBodyStyle: {
        padding: '24px 0'
      },
      nzMaskClosable: false,
      nzComponentParams: {
        resumeInfo: this.resumeInfo
      },
      nzFooter: null
    });
    // modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    modal.afterClose.subscribe(result => {
      console.log('[afterClose 转发modal] The result is:', result);
      if(result && result.type === 'success') {
        // 操作成功后，需要重新获取 记录等信息
        this.resetConfigs();
      }
    });

  }

  deliver(): void { // 下载
    const modal = this.modal.create({
      nzTitle: '投递记录',
      nzContent: OperDeliverListTplComponent,
      // nzViewContainerRef: this.viewContainerRef,
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
    // modal.afterClose.subscribe(result => console.log('[afterClose 简历投递记录] The result is:', result));

  }

  send(): void { // 转发
    const modal = this.modal.create({
      nzTitle: '提示',
      nzContent: OperSendModalComponent,
      // nzViewContainerRef: this.viewContainerRef,
      nzMaskClosable: false,
      nzComponentParams: {
        resumeInfo: this.resumeInfo
      },
      nzFooter: null
    });
    // modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    modal.afterClose.subscribe(result => {
      console.log('[afterClose 转发modal] The result is:', result);
      if(result && result.type === 'success') {
        // 操作成功后，需要重新获取 记录等信息
        this.resetConfigs();
      }
    });

  }

  save(): void { // 保存
    const modal = this.modal.create({
      nzTitle: '提示',
      nzContent: OperSaveModalComponent,
      nzMaskClosable: false,
      // nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        resumeInfo: this.resumeInfo
      },
      nzFooter: null
    });
    // modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    modal.afterClose.subscribe(result => {
      console.log('[afterClose 保存modal] The result is:', result);
      if(result && result.type === 'success') {
        // 操作成功后，需要重新获取 记录等信息
        this.resetConfigs();
      }
    });

  }

  collect(): void { // 收藏
    const modal = this.modal.create({
      nzTitle: '提示',
      nzContent: OperCollectModalComponent,
      nzMaskClosable: false,
      // nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        resumeInfo: this.resumeInfo
      },
      nzFooter: null
    });
    // modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    modal.afterClose.subscribe(result => {
      console.log('[afterClose 收藏modal] The result is:', result);
      if(result && result.type === 'success') {
        // 操作成功后，需要重新获取 记录等信息
        this.resetConfigs();
      }
    });

  }

  remark(): void { // 备注
    const modal = this.modal.create({
      nzTitle: '备注',
      nzContent: OperRemarkModalComponent,
      nzMaskClosable: false,
      // nzViewContainerRef: this.viewContainerRef,
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
    modal.afterClose.subscribe(result => {
      console.log('[afterClose 备注modal] The result is:', result)
      if(result && result.type === 'success') {
        // 操作成功后，需要重新获取 记录等信息
        this.resetConfigs();
      }
    });

  }

  resetConfigs():void {
    this.configEmitChange.emit();
  }
}
