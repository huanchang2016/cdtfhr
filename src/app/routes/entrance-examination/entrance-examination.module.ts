import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { EntranceExaminationRoutingModule } from './entrance-examination-routing.module';
import { EntranceHomeComponent } from './home/home.component';
import { ZkBannerTplComponent } from './component/zk-banner-tpl/zk-banner-tpl.component';
import { ZkAdvertingListTplComponent } from './component/zk-adverting-list-tpl/zk-adverting-list-tpl.component';
import { ZkNewsListTplComponent } from './component/zk-news-list-tpl/zk-news-list-tpl.component';
import { CommonProblemComponent } from './common-problem/common-problem.component';
import { PromulgateComponent } from './promulgate/promulgate-list/promulgate.component';
import { PromulgateDetailsComponent } from './promulgate/promulgate-details/promulgate-details.component';
import { NewsCenterComponent } from './news/news-center/news-center.component';
import { NewsDetailsComponent } from './news/news-details/news-details.component';
import { ApplyOnlineListComponent } from './apply/apply-online-list/apply-online-list.component';
import { ApplyOnlineDetailsComponent } from './apply/apply-online-details/apply-online-details.component';

const ROUTESCOMPONENTS = [
  EntranceHomeComponent,
  CommonProblemComponent,
  PromulgateComponent,
  PromulgateDetailsComponent,
  NewsCenterComponent,
  NewsDetailsComponent
];

const ENTRYCOMPONENTS = [
  ZkBannerTplComponent,
  ZkAdvertingListTplComponent,
  ZkNewsListTplComponent
];

@NgModule({
  declarations: [
    ...ROUTESCOMPONENTS,
    ...ENTRYCOMPONENTS,
    ApplyOnlineListComponent,
    ApplyOnlineDetailsComponent
  ],
  imports: [
    SharedModule,
    EntranceExaminationRoutingModule
  ]
})
export class EntranceExaminationModule { }
