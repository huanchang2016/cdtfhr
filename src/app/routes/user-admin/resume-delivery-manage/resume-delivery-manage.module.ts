import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { ResumeDeliveryManageRoutingModule } from './resume-delivery-manage-routing.module';
import { DeliveryRecordListComponent } from './delivery-record-list/delivery-record-list.component';
import { DeliveryViewedListComponent } from './delivery-viewed-list/delivery-viewed-list.component';
import { PositionDeliveryRecordListCComponent } from './component/position-delivery-record-list-c/position-delivery-record-list-c.component';
import { DeliveryStatusTplComponent } from './component/delivery-status-tpl/delivery-status-tpl.component';


const COMPONENTS = [
  DeliveryRecordListComponent,
  DeliveryViewedListComponent
];


const ENTRYCOMPONENTS = [
  // 简历投递职位记录
  PositionDeliveryRecordListCComponent,
  // 投递详情（状态）查看
  DeliveryStatusTplComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...ENTRYCOMPONENTS
  ],
  entryComponents: [
    ...ENTRYCOMPONENTS
  ],
  imports: [
    SharedModule,
    ResumeDeliveryManageRoutingModule
  ]
})
export class ResumeDeliveryManageModule { }
