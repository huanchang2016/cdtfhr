import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserCommentFormTplComponent } from './user-comment-form-tpl/user-comment-form-tpl.component';

@Component({
  selector: 'app-user-self-comment-tpl',
  templateUrl: './user-comment-tpl.component.html',
  styleUrls: ['./user-comment-tpl.component.less']
})
export class UserCommentTplComponent implements OnInit {

  @Input() resumeInfo: any;

  constructor(
    private modal: NzModalService
  ) { }

  ngOnInit(): void {
  }

  editInfo() {
    const modal = this.modal.create({
      nzTitle: '编辑自我评价',
      nzContent: UserCommentFormTplComponent,
      nzWidth: '800px',
      nzBodyStyle: {
        padding: '24px 100px 30px'
      },
      nzMaskClosable: false,
      nzComponentParams: {
        data: this.resumeInfo
      },
      nzFooter: null
    });
    // Return a result when closed
    modal.afterClose.subscribe(result => {
      if (result && result.data) {
        this.resumeInfo = Object.assign(this.resumeInfo, result.data);
      }
    });

  }
}
