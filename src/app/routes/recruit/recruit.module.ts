import { NgModule } from '@angular/core';

import { RecruitRoutingModule } from './recruit-routing.module';
import { RecruitHomeComponent } from './home/home.component';
import { SharedModule } from '@shared';


@NgModule({
  declarations: [
    RecruitHomeComponent
  ],
  imports: [
    SharedModule,
    RecruitRoutingModule
  ]
})
export class RecruitModule { }
