import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecruitHomeComponent } from './home/home.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: RecruitHomeComponent, data: { title: '职位搜索'} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecruitRoutingModule { }
