import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { EntranceExaminationRoutingModule } from './entrance-examination-routing.module';
import { EntranceHomeComponent } from './home/home.component';
import { ZkBannerTplComponent } from './component/zk-banner-tpl/zk-banner-tpl.component';
import { ZkAdvertingListTplComponent } from './component/zk-adverting-list-tpl/zk-adverting-list-tpl.component';
import { ZkNewsListTplComponent } from './component/zk-news-list-tpl/zk-news-list-tpl.component';

const ROUTESCOMPONENTS = [
  EntranceHomeComponent,
];

const ENTRYCOMPONENTS = [
  ZkBannerTplComponent,
  ZkAdvertingListTplComponent,
  ZkNewsListTplComponent
];

@NgModule({
  declarations: [
    ...ROUTESCOMPONENTS,
    ...ENTRYCOMPONENTS
  ],
  imports: [
    SharedModule,
    EntranceExaminationRoutingModule
  ]
})
export class EntranceExaminationModule { }
