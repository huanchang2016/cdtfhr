import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'app-oper-send-modal',
  templateUrl: './oper-send-modal.component.html',
  styleUrls: ['./oper-send-modal.component.less']
})
export class OperSendModalComponent implements OnInit {
  @Input() resumeInfo:any;

  constructor(
    private modal: NzModalRef,
    private msg: NzMessageService
  ) {}

  submitLoading:boolean = false;

  handleCancel() {
    this.submitLoading = false;
    this.destroyModal();
  }

  emails:string = null;
  handleOk() {
    let emails:string = '';
    if(this.emails && this.emails.trim()) {
      emails = this.emails.trim();
    }
    if(!emails) {
      this.msg.warning('备注信息内容未填写');
      return;
    }


    this.submitLoading = true;
    setTimeout(() => {
      this.submitLoading = false;
      this.destroyModal({name: '点击确认提交', data: emails});
    }, 1000);
  }

  destroyModal(data?:any): void {
    this.modal.destroy(data);
  }

  ngOnInit(): void {
    console.log('转发简历 works: 最多同时发送5份邮件，邮箱地址请用英文“;”隔开')
  }
}
