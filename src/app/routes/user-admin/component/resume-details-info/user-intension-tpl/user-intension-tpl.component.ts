import { Component, OnInit, Input } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserIntensionFormTplComponent } from './user-intension-form-tpl/user-intension-form-tpl.component';

@Component({
  selector: 'app-user-intension-tpl',
  templateUrl: './user-intension-tpl.component.html',
  styleUrls: ['./user-intension-tpl.component.less']
})
export class UserIntensionTplComponent implements OnInit {

  @Input() resumeInfo: any;

  constructor(
    private modal: NzModalService
  ) { }

  ngOnInit(): void {
  }

  editInfo() {
    const modal = this.modal.create({
      nzTitle: '编辑求职意向',
      nzContent: UserIntensionFormTplComponent,
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
