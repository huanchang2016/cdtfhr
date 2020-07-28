import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DeliveryStatusTplComponent } from '../delivery-status-tpl/delivery-status-tpl.component';

@Component({
  selector: 'app-position-delivery-record-list-c',
  templateUrl: './position-delivery-record-list-c.component.html',
  styleUrls: ['./position-delivery-record-list-c.component.less']
})
export class PositionDeliveryRecordListCComponent implements OnInit {
  @Input() listOfData:any[];

  constructor(
    private modal: NzModalService,
    // private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
  }

  createModal(data:any):void {
    const modal = this.modal.create({
      nzTitle: '投递进展',
      nzContent: DeliveryStatusTplComponent,
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
