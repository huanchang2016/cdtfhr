import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() resumeInfo: any;
  @Input() params?: any;
  @Input() configs: any;

  @Output() configEmitChange: EventEmitter<any> = new EventEmitter();
  @Output() downLoadSuccessChange: EventEmitter<any> = new EventEmitter();

  constructor(
    private modal: NzModalService,
    private iconService: NzIconService,
    public settingService: GlobalSettingsService
  ) {
    this.iconService.fetchFromIconfont({
      scriptUrl: 'https://at.alicdn.com/t/font_8d5l8fzk5b87iudi.js'
    });
  }

  ngOnInit(): void {
  }

  logs: any[] = null; // 操作日志


  viewOperRecord(): void {
    const modal = this.modal.create({
      nzTitle: '操作记录',
      nzContent: OperRecordListTplComponent,
      nzWidth: '800px',
      nzMaskClosable: false,
      nzComponentParams: {
        resumeInfo: this.resumeInfo
      },
      nzFooter: null
    });

  }
  viewRemarks(): void {
    const modal = this.modal.create({
      nzTitle: '备注记录',
      nzContent: OperRemarkListTplComponent,
      nzWidth: '800px',
      nzMaskClosable: false,
      nzComponentParams: {
        resumeInfo: this.resumeInfo
      },
      nzFooter: null
    });

  }

  download(): void { // 下载
    const modal = this.modal.create({
      nzTitle: '下载简历',
      nzContent: OperDownloadModalComponent,
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
    // Return a result when closed
    modal.afterClose.subscribe(result => {
      if (result && result.type === 'success') {
        this.resetConfigs();
        this.downLoadSuccessChange.emit();
      }
    });

  }

  deliver(): void { // 下载
    const modal = this.modal.create({
      nzTitle: '投递记录',
      nzContent: OperDeliverListTplComponent,
      nzWidth: '800px',
      nzMaskClosable: false,
      nzComponentParams: {
        resumeInfo: this.resumeInfo
      },
      nzFooter: null
    });
  }

  send(): void { // 转发
    const modal = this.modal.create({
      nzTitle: '提示',
      nzContent: OperSendModalComponent,
      nzMaskClosable: false,
      nzComponentParams: {
        resumeInfo: this.resumeInfo
      },
      nzFooter: null
    });
    modal.afterClose.subscribe(result => {
      if (result && result.type === 'success') {
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
    // Return a result when closed
    modal.afterClose.subscribe(result => {
      if (result && result.type === 'success') {
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
    // Return a result when closed
    modal.afterClose.subscribe(result => {
      if (result && result.type === 'success') {
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
    // Return a result when closed
    modal.afterClose.subscribe(result => {
      if (result && result.type === 'success') {
        // 操作成功后，需要重新获取 记录等信息
        this.resetConfigs();
      }
    });

  }

  resetConfigs(): void {
    this.configEmitChange.emit();
  }
}
