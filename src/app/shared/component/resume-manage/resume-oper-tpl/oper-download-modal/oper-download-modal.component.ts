import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'app-oper-download-modal',
  templateUrl: './oper-download-modal.component.html',
  styleUrls: ['./oper-download-modal.component.less']
})
export class OperDownloadModalComponent implements OnInit {
  @Input() resumeInfo:any;

  submitLoading:boolean = false;

  data:any[] = [
    {id:1},
    {id:2},
    {id:3},
    {id:4},
    {id:5},
    {id:6},
    {id:7},
    {id:8},
    {id:9},
    {id:10},
    {id:11},
    {id:12},
    {id:13},
    {id:14}
  ];

  constructor(
    private modal: NzModalRef,
    private msg: NzMessageService
  ) {}

  beRelated = false;
  setOfCheckedId = new Set<number>();

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
    console.log(this.setOfCheckedId, 'value', this.setOfCheckedId.size);
    if(this.setOfCheckedId.size > 0) {
      this.beRelated = false;
    }
  }

  selectedChange(checked:any, data:any) {
    console.log('checkbox change', checked, data);
    this.updateCheckedSet(data.id, checked);
  }

  onAllChecked(checked:boolean):void {
    if(checked) {
      this.setOfCheckedId.clear();
    }
  }

  handleCancel() {
    this.submitLoading = false;
    this.destroyModal();
  }

  handleOk() {
    if(this.setOfCheckedId.size < 1 && !this.beRelated) {
      this.msg.warning('当前简历是否需要关联到职位未选择！');
      return;
    }
    const requestData = this.data.filter(data => this.setOfCheckedId.has(data.id));
    console.log('selected item data: ', requestData);
    this.submitLoading = true;
    setTimeout(() => {
      this.setOfCheckedId.clear();
      this.submitLoading = false;
      this.destroyModal({name: '点击确认提交'});
    }, 1000);
    
  }

  destroyModal(data?:any): void {
    this.modal.destroy(data);
  }


  ngOnInit(): void {
    console.log('下载简历 works: 获取当前公司下 发布的有效职位列表，同时可以选择是否将当前简历关联到某个职位下，直接进入合适的状态');
  }

}
