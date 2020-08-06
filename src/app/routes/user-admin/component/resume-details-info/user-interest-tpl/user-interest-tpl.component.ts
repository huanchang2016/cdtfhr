import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserInterestFormTplComponent } from './user-interest-form-tpl/user-interest-form-tpl.component';

@Component({
  selector: 'app-user-self-interest-tpl',
  templateUrl: './user-interest-tpl.component.html',
  styleUrls: ['./user-interest-tpl.component.less']
})
export class UserInterestTplComponent implements OnInit {

  @Input() resumeInfo:any;

  constructor(
    private modal: NzModalService,
    // private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
  }

  editInfo() {
    const modal = this.modal.create({
      nzTitle: '编辑兴趣爱好',
      nzContent: UserInterestFormTplComponent,
      // nzViewContainerRef: this.viewContainerRef,
      nzWidth: '800px',
      nzBodyStyle: {
        padding: '24px 100px 30px'
      },
      nzMaskClosable: false,
      // nzGetContainer: () => document.body,
      nzComponentParams: {
        data: this.resumeInfo
      },
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
      nzFooter: null
    });
    // const instance = modal.getContentComponent();
    // modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    modal.afterClose.subscribe(result => {
      if(result && result.data) {
        this.resumeInfo = Object.assign(this.resumeInfo, result.data);
      }
    });

  }
}
