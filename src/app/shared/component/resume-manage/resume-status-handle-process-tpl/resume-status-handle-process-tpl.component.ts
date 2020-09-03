import { Component, OnInit, Input, ViewContainerRef, Output, EventEmitter } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { InterviewMessageSendTplComponent } from '../interview-message-send-tpl/interview-message-send-tpl.component';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-resume-status-handle-process-tpl',
  templateUrl: './resume-status-handle-process-tpl.component.html',
  styleUrls: ['./resume-status-handle-process-tpl.component.less']
})
export class ResumeStatusHandleProcessTplComponent implements OnInit {

  @Input() positionId: number;
  @Input() resumeInfo: any;
  @Input() configs: any;

  @Output() configEmitChange: EventEmitter<any> = new EventEmitter();

  positionInfo: any;

  constructor(
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private msg: NzMessageService,
    private settingService: GlobalSettingsService
  ) { }

  ngOnInit(): void {
    console.log('status change', this.positionId, this.resumeInfo, 'configs', this.configs);
    // 获取当前简历所投递的职位的信息
    this.settingService.get(`/v1/web/jobs/${this.positionId}`).subscribe((res:ApiData) => {
      console.log(res, 'get Position details Data');
      this.positionInfo = res.data;
    });
  }
  // 简历处理  方法 调用   淘汰   不合适  offer  下一阶段等
  submitLoading: boolean = false;
  dealResume(): void {

    const option = {
      job_id: this.positionId,
      ids: [this.resumeInfo.id]
    };
    if(this.submitLoading) {
      return;
    }

    this.submitLoading = true;

    this.settingService.post('/v1/web/com/resume/refuse/muti', option).subscribe((res: ApiData) => {
      console.log(res);
      this.submitLoading = false;
      if (res.code === 200) {
        this.msg.success('操作成功');
        this.resetConfigs();
      } else {
        this.msg.error(res.message);
      }
    }, err => this.submitLoading = false);
  }

  nextStepsIn(): void {
    const option = {
      job_id: this.positionId,
      status: this.configs.status,
      ids: [this.resumeInfo.id]
    };
    if(this.submitLoading) {
      return;
    }
    this.submitLoading = true;
    this.settingService.post('/v1/web/com/resume/status/muti', option).subscribe((res: ApiData) => {
      console.log(res);
      this.submitLoading = false;
      if (res.code === 200) {
        this.msg.success('操作成功');
        this.resetConfigs();
      } else {
        this.msg.error(res.message);
      }
    }, err => this.submitLoading = false);
  }

  interviewSend(): void { // 保存
    const modal = this.modal.create({
      nzTitle: '通知面试',
      nzContent: InterviewMessageSendTplComponent,
      // nzViewContainerRef: this.viewContainerRef,
      nzWidth: '800px',
      nzComponentParams: {
        resumeInfo: this.resumeInfo,
        positionInfo: this.positionInfo
      },
      nzFooter: null
    });
    // modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    modal.afterClose.subscribe(result => {
      console.log('[afterClose 转发modal] The result is:', result)
      if(result && result.type === 'success') {
        // 操作成功后，需要重新获取 记录 状态等信息
        this.resetConfigs();
      }
    });

  }

  resetConfigs(): void {
    this.configEmitChange.emit();
  }

}
