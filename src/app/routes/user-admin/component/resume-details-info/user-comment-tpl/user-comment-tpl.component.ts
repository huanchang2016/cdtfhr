import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserCommentFormTplComponent } from './user-comment-form-tpl/user-comment-form-tpl.component';

@Component({
  selector: 'app-user-self-comment-tpl',
  templateUrl: './user-comment-tpl.component.html',
  styleUrls: ['./user-comment-tpl.component.less']
})
export class UserCommentTplComponent implements OnInit {

  data:any = null;

  constructor(
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
  }

  editInfo() {
    const modal = this.modal.create({
      nzTitle: '编辑自我评价',
      nzContent: UserCommentFormTplComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzWidth: '800px',
      nzBodyStyle: {
        padding: '24px 100px 30px'
      },
      nzMaskClosable: false,
      nzGetContainer: () => document.body,
      nzComponentParams: {
        data: this.data
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
