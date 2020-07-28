import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserCertificateFormTplComponent } from './user-certificate-form-tpl/user-certificate-form-tpl.component';


@Component({
  selector: 'app-user-certificate-tpl',
  templateUrl: './user-certificate-tpl.component.html',
  styleUrls: ['./user-certificate-tpl.component.less']
})
export class UserCertificateTplComponent implements OnInit {

  list:any[] = [1, 2];

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
      nzTitle: ( data ? '编辑' : '新增' ) + '证书信息',
      nzContent: UserCertificateFormTplComponent,
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