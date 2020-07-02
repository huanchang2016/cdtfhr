import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecruitHomeComponent } from './home/home.component';
import { HotRecruitComponent } from './hot-recruit/hot-recruit.component';
import { InProgressRecruitComponent } from './in-progress-recruit/in-progress-recruit.component';
import { PositionDetailsComponent } from './position-details/position-details.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: RecruitHomeComponent, data: { title: '职位搜索'} },
  { path: 'hot', component: HotRecruitComponent, data: { title: '热门招聘'} },
  { path: 'progress', component: InProgressRecruitComponent, data: { title: '正在招聘'} },
  { path: 'details/:id', component: PositionDetailsComponent, data: { title: '正在招聘'} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecruitRoutingModule { }
