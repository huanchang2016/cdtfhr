import { NgModule } from '@angular/core';

import { RecruitRoutingModule } from './recruit-routing.module';
import { SharedModule } from '@shared';
import { RightSidebarAdvertComponent } from './component/right-sidebar-advert/right-sidebar-advert.component';
import { RightSidebarJobHistoryComponent } from './component/right-sidebar-job-history/right-sidebar-job-history.component';
import { RecruitHomeComponent } from './home/home.component';
import { HotRecruitComponent } from './hot-recruit/hot-recruit.component';
import { InProgressRecruitComponent } from './in-progress-recruit/in-progress-recruit.component';
import { PositionDetailsComponent } from './position-details/position-details.component';
import { RecommendPositionsComponent } from './position-details/recommend-positions/recommend-positions.component';


@NgModule({
  declarations: [
    // 路由组件
    RecruitHomeComponent,
    HotRecruitComponent,
    InProgressRecruitComponent,
    PositionDetailsComponent,
    // 子组件
    RightSidebarAdvertComponent,
    RightSidebarJobHistoryComponent,
    RecommendPositionsComponent
  ],
  imports: [
    SharedModule,
    RecruitRoutingModule
  ]
})
export class RecruitModule { }
