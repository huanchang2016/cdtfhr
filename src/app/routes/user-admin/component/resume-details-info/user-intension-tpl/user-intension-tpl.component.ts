import { Component, OnInit, Input } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserIntensionFormTplComponent } from './user-intension-form-tpl/user-intension-form-tpl.component';

@Component({
  selector: 'app-user-intension-tpl',
  templateUrl: './user-intension-tpl.component.html',
  styleUrls: ['./user-intension-tpl.component.less']
})
export class UserIntensionTplComponent implements OnInit {

  @Input() resumeInfo:any;

  constructor(
    private modal: NzModalService,
    // private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
  }

  editInfo() {
    const modal = this.modal.create({
      nzTitle: '编辑求职意向',
      nzContent: UserIntensionFormTplComponent,
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
      // nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
      nzFooter: null
    });
    // const instance = modal.getContentComponent();
    // modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    modal.afterClose.subscribe(result => {
      console.log('[afterClose] The result is:', result)
      if(result && result.data) {
        this.resumeInfo = Object.assign(this.resumeInfo, result.data);
      }
    });

  }
}
