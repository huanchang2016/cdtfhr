import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { InterviewMessageSendTplComponent } from '../interview-message-send-tpl/interview-message-send-tpl.component';

@Component({
  selector: 'app-resume-status-handle-process-tpl',
  templateUrl: './resume-status-handle-process-tpl.component.html',
  styleUrls: ['./resume-status-handle-process-tpl.component.less']
})
export class ResumeStatusHandleProcessTplComponent implements OnInit {

  @Input() positionId:number;
  @Input() resumeInfo:any;

  positionInfo:any;

  constructor(
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit(): void {
    console.log('status change', this.positionId, this.resumeInfo);
  }

  
  interviewSend(): void { // 保存
    const modal = this.modal.create({
      nzTitle: '通知面试',
      nzContent: InterviewMessageSendTplComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzWidth: '800px',
      nzComponentParams: {
        resumeInfo: this.resumeInfo,
        positionInfo: this.positionInfo
      },
      nzFooter: null
    });
    // modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    modal.afterClose.subscribe(result => console.log('[afterClose 转发modal] The result is:', result));

  }



}
