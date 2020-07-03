import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyIndexComponent } from './index/index.component';
import { CompanyHomeComponent } from './component/home/home.component';

import { RecruitPositionsComponent } from './component/recruit-positions/recruit-positions.component';

const COMPONENTS = [
  CompanyIndexComponent,
  CompanyHomeComponent,
  RecruitPositionsComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    SharedModule,
    CompanyRoutingModule
  ]
})
export class CompanyModule { }
