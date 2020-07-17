import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserWorkExpFormTplComponent } from './user-work-exp-form-tpl/user-work-exp-form-tpl.component';

@Component({
  selector: 'app-user-work-exp-tpl',
  templateUrl: './user-work-exp-tpl.component.html',
  styleUrls: ['./user-work-exp-tpl.component.less']
})
export class UserWorkExpTplComponent implements OnInit {

  list:any[] = [1, 2];

  constructor(
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
  }

  add() {
    this.createModal();
  }

  edit(data:any):void {
    this.createModal(data);
  }
  deleted(data:any):void {
    console.log('删除数据', data);
  }

  createModal(data:any = null):void {
    const modal = this.modal.create({
      nzTitle: ( data ? '编辑' : '新增' )+ '工作经历',
      nzContent: UserWorkExpFormTplComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzWidth: '800px',
      nzBodyStyle: {
        padding: '24px 100px 30px'
      },
      nzMaskClosable: false,
      nzGetContainer: () => document.body,
      nzComponentParams: {
        data: data
      },
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
      nzFooter: null
    });
    // const instance = modal.getContentComponent();
    // modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    modal.afterClose.subscribe(result => {
      console.log('[afterClose] The result is:', result)
    });
  }
}
