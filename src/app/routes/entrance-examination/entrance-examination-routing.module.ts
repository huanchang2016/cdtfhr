import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonProblemComponent } from './common-problem/common-problem.component';
import { EntranceHomeComponent } from './home/home.component';
import { NewsCenterComponent } from './news/news-center/news-center.component';
import { NewsDetailsComponent } from './news/news-details/news-details.component';
import { PromulgateDetailsComponent } from './promulgate/promulgate-details/promulgate-details.component';
import { PromulgateComponent } from './promulgate/promulgate-list/promulgate.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: EntranceHomeComponent },
  { path: 'questions', component: CommonProblemComponent },
  { path: 'promulgate', component: PromulgateComponent },
  { path: 'promulgate/details/:id', component: PromulgateDetailsComponent },
  { path: 'news', component: NewsCenterComponent },
  { path: 'news/details/:id', component: NewsDetailsComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntranceExaminationRoutingModule { }
