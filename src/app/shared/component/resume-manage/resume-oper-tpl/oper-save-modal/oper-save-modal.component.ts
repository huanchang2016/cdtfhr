import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'app-oper-save-modal',
  templateUrl: './oper-save-modal.component.html',
  styleUrls: ['./oper-save-modal.component.less']
})
export class OperSaveModalComponent implements OnInit {
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

  type:number = null;
  handleOk() {
    
    if(!this.type) {
      this.msg.warning('备注信息内容未填写');
      return;
    }


    this.submitLoading = true;
    setTimeout(() => {
      this.submitLoading = false;
      this.destroyModal({name: '点击确认提交', data: this.type});
    }, 1000);
  }

  destroyModal(data?:any): void {
    this.modal.destroy(data);
  }

  ngOnInit(): void {
    console.log('保存简历 works: 可以对应的选择当前简历的保存格式，如：PDF，word等等')
  }

}
