import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'app-collect-file-form-tpl',
  templateUrl: './collect-file-form-tpl.component.html',
  styleUrls: ['./collect-file-form-tpl.component.less']
})
export class CollectFileFormTplComponent implements OnInit {
  @Input() data?:any;

  file_name:string;
  
  constructor(
    private modal: NzModalRef,
    private msg: NzMessageService
  ) {}

  submitLoading:boolean = false;

  handleCancel() {
    this.submitLoading = false;
    this.destroyModal();
  }

  handleOk() {
    let file_name:string = '';
    if(this.file_name && this.file_name.trim()) {
      file_name = this.file_name.trim();
    }
    if(!file_name) {
      this.msg.warning('备注信息内容未填写');
      return;
    }


    this.submitLoading = true;
    setTimeout(() => {
      this.submitLoading = false;
      this.destroyModal({name: '点击确认提交', data: file_name});
    }, 1000);
  }

  destroyModal(data?:any): void {
    this.modal.destroy(data);
  }

  ngOnInit(): void {
    console.log('简历库，新建收藏文件夹 works: 最多同时发送5份邮件，邮箱地址请用英文“;”隔开')
    if(this.data) {
      this.file_name = this.data.name;
    }
  }
}
