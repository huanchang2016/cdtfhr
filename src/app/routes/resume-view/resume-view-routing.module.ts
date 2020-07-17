import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResumeViewComponent } from './resume-view.component';


const routes: Routes = [
  { path: 'view/:id', component: ResumeViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResumeViewRoutingModule { }
