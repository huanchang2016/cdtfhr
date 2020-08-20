import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-oper-remark-modal',
  templateUrl: './oper-remark-modal.component.html',
  styleUrls: ['./oper-remark-modal.component.less']
})
export class OperRemarkModalComponent implements OnInit {
  @Input() resumeInfo:any;

  data:number[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];
  
  remark:string = null;
  
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
    let _remark:string = '';
    if(this.remark && this.remark.trim()) {
      _remark = this.remark.trim();
    }
    if(!_remark) {
      this.msg.warning('备注信息内容未填写');
      return;
    }


    this.submitLoading = true;
    setTimeout(() => {
      this.submitLoading = false;
      this.destroyModal({name: '点击确认提交'});
    }, 1000);
  }

  destroyModal(data?:any): void {
    this.modal.destroy(data);
  }

  ngOnInit(): void {
    console.log('简历添加备注 works: 请输入备注信息， 同时展示公司下其他账号对该简历的备注信息')
  }

}
