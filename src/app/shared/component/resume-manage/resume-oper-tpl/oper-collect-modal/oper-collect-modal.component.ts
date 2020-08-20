import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'app-oper-collect-modal',
  templateUrl: './oper-collect-modal.component.html',
  styleUrls: ['./oper-collect-modal.component.less']
})
export class OperCollectModalComponent implements OnInit {
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
    console.log('收藏简历 works: 收藏当前简历， 选择收藏夹（收藏夹可以分类创建，类似分组）')
  }

}
