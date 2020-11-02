import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplyOnlineDetailsComponent } from './apply/apply-online-details/apply-online-details.component';
import { ApplyOnlineListComponent } from './apply/apply-online-list/apply-online-list.component';
import { CommonProblemComponent } from './common-problem/common-problem.component';
import { EntranceHomeComponent } from './home/home.component';
import { NewsCenterComponent } from './news/news-center/news-center.component';
import { NewsDetailsComponent } from './news/news-details/news-details.component';
import { PromulgateDetailsComponent } from './promulgate/promulgate-details/promulgate-details.component';
import { PromulgateComponent } from './promulgate/promulgate-list/promulgate.component';

import { AdmissionTicketPrintComponent } from './admission-ticket-print/admission-ticket-print.component';
import { ScoreQueryResultComponent } from './score-query-result/score-query-result.component';

import { PrintExamListComponent } from './print-exam-list/print-exam-list.component';
import { ResultExamListComponent } from './result-exam-list/result-exam-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: EntranceHomeComponent },
  { path: 'apply', component: ApplyOnlineListComponent },
  { path: 'apply/details/:id', component: ApplyOnlineDetailsComponent },
  { path: 'print/exam', component: PrintExamListComponent },
  { path: 'print/exam/:id', component: AdmissionTicketPrintComponent },
  { path: 'result/exam', component: ResultExamListComponent },
  { path: 'result/exam/:id', component: ScoreQueryResultComponent },
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
