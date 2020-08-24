import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-oper-record-list-tpl',
  templateUrl: './oper-record-list-tpl.component.html',
  styleUrls: ['./oper-record-list-tpl.component.less']
})
export class OperRecordListTplComponent implements OnInit {
  @Input() resumeInfo:any;
  
  list:any[] = [1, 2, 3,4,5,6,7,8];
  constructor(
    private modal: NzModalRef
  ) {}


  handleCancel() {
    this.destroyModal();
  }


  destroyModal(): void {
    this.modal.destroy();
  }


  ngOnInit(): void {
    console.log('简历操作记录 works: 收藏当前简历， 选择收藏夹（收藏夹可以分类创建，类似分组）')
  }

}
