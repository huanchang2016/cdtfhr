import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserProjectFormTplComponent } from './user-project-form-tpl/user-project-form-tpl.component';

@Component({
  selector: 'app-user-project-exp-tpl',
  templateUrl: './user-project-exp-tpl.component.html',
  styleUrls: ['./user-project-exp-tpl.component.less']
})
export class UserProjectExpTplComponent implements OnInit {

  list:any[] = [1];

  constructor(
    private modal: NzModalService,
    // private viewContainerRef: ViewContainerRef
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
      nzTitle: ( data ? '编辑' : '新增' )+ '项目经历',
      nzContent: UserProjectFormTplComponent,
      // nzViewContainerRef: this.viewContainerRef,
      nzWidth: '800px',
      nzBodyStyle: {
        padding: '24px 100px 30px'
      },
      nzMaskClosable: false,
      // nzGetContainer: () => document.body,
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
