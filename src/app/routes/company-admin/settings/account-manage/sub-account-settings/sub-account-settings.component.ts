import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { SubAccountFormCComponent } from './sub-account-form-c/sub-account-form-c.component';

@Component({
  selector: 'app-sub-account-settings',
  templateUrl: './sub-account-settings.component.html',
  styleUrls: ['./sub-account-settings.component.less']
})
export class SubAccountSettingsComponent implements OnInit {
  listOfData: any[] = [];
  loading: boolean = true;

  tplModal?: NzModalRef;

  constructor(
    private modal: NzModalService
  ) { }

  ngOnInit(): void {

    this.getDataList();
  }

  getDataList(): void {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.listOfData = [1, 2, 3]
    }, 500);
  }

  edit(data: any): void {
    this.createModal(data);
  }

  add(): void {
    this.createModal();
  }

  createModal(data:any = null):void {
    this.tplModal = this.modal.create({
      nzTitle: (data ? '编辑' : '新建') + '子账号',
      nzContent: SubAccountFormCComponent,
      nzWidth: '800px',
      nzBodyStyle: {
        padding: '24px 100px 30px'
      },
      nzMaskClosable: false,
      nzComponentParams: {
        data: data
      },
      nzFooter: null
    });

    // const instance = modal.getContentComponent();
    // modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    this.tplModal.afterClose.subscribe(result => {
      console.log('[afterClose] The result is:', result)
    });
  }

  deleted(data: any): void {

  }

  cancel(): void { }

}
