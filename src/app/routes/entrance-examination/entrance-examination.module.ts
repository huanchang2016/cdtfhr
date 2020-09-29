import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { EntranceExaminationRoutingModule } from './entrance-examination-routing.module';
import { EntranceHomeComponent } from './home/home.component';
import { ZkBannerTplComponent } from './component/zk-banner-tpl/zk-banner-tpl.component';

const ROUTESCOMPONENTS = [
  EntranceHomeComponent,
  ZkBannerTplComponent
];

const ENTRYCOMPONENTS = [
];

@NgModule({
  declarations: [
    ...ROUTESCOMPONENTS,
  ],
  imports: [
    SharedModule,
    EntranceExaminationRoutingModule
  ]
})
export class EntranceExaminationModule { }
