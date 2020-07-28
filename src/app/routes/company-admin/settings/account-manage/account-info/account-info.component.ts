import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { SourceInfoFormComponent } from './source-info-form/source-info-form.component';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.less']
})
export class AccountInfoComponent implements OnInit {

  tplModal?: NzModalRef;

  constructor(
    private modal: NzModalService
  ) { }

  ngOnInit(): void {
  }

  sourceChange():void {
    console.log('change source info');

    const modal = this.modal.create({
      nzTitle: '资源分配设置',
      nzContent: SourceInfoFormComponent,
      nzWidth: '800px',
      nzBodyStyle: {
        padding: '0'
      },
      nzMaskClosable: false,
      nzComponentParams: {
        data: null
      },
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
