import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';


@Component({
  selector: 'app-oper-send-modal',
  templateUrl: './oper-send-modal.component.html',
  styleUrls: ['./oper-send-modal.component.less']
})
export class OperSendModalComponent implements OnInit {
  @Input() resumeInfo:any;

  constructor(
    private modal: NzModalRef,
    private msg: NzMessageService,
    private settingService: GlobalSettingsService
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
      this.msg.warning('邮箱不能为空');
      return;
    }
    
    this.submitLoading = true;
    this.settingService.post(`/v1/web/com/send_resume_email`, { email: emails }).subscribe((res:ApiData) => {
      this.submitLoading = false;
      if(res.code === 200) {
        this.msg.success('转发成功');
        this.destroyModal({type: 'success'});
      }else {
        this.msg.error(res.message);
      }
    }, err => this.submitLoading = false);
  }

  destroyModal(data?:any): void {
    this.modal.destroy(data);
  }

  ngOnInit(): void {
    console.log('转发简历 works: 最多同时发送5份邮件，邮箱地址请用英文“;”隔开')
  }
}
