import { PositionManageGuard } from './guard/position-manage.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyAdminLayoutComponent } from './company-admin-layout/company-admin-layout.component';
// import { CompanyAdminHomeComponent } from './company-center/company-admin-home/company-admin-home.component';
import { PositionListComponent } from './positions-manage/position-list/position-list.component';
// import { PositionCreateComponent } from './positions-manage/position-create/position-create.component';
import { ResumesListComponent } from './resumes-manage/resumes-list/resumes-list.component';
import { ResumesHandleComponent } from './resumes-manage/resumes-handle/resumes-handle.component';
// 简历库
import { ResumesHistoryComponent } from './resumes-manage/resumes-history/resumes-history.component';
import { ResumesCollectListComponent } from './resumes-manage/resumes-collect-list/resumes-collect-list.component';
import { ResumesDownloadListComponent } from './resumes-manage/resumes-download-list/resumes-download-list.component';

import { OrganizationComponent } from './settings/organization/organization.component';
import { ResumesByPositionComponent } from './resumes-manage/resumes-by-position/resumes-by-position.component';
import { ComAuthenticationGuard } from './guard/com-authentication.guard';
import { ComStatusCheckGuard } from './guard/com-status-check.guard';

const routes: Routes = [
  {
    path: '', component: CompanyAdminLayoutComponent,
    canActivate: [ComAuthenticationGuard],
    children: [
      { path: '', redirectTo: 'positions', pathMatch: 'full' },
      // { path: 'home', component: CompanyAdminHomeComponent },
      {
        path: 'positions',
        canActivate: [
          ComStatusCheckGuard,
          PositionManageGuard
        ], component: PositionListComponent
      },
      // { path: 'position/create', component: PositionCreateComponent },
      {
        path: 'resumes/search',
        canActivate: [
          ComStatusCheckGuard
        ], component: ResumesListComponent
      },
      {
        path: 'resumes/handle',
        canActivate: [
          ComStatusCheckGuard
        ], component: ResumesHandleComponent
      },
      {
        path: 'resumes/handle/:positionId',
        canActivate: [
          ComStatusCheckGuard
        ], component: ResumesByPositionComponent
      },
      {
        path: 'resumes/history',
        canActivate: [
          ComStatusCheckGuard
        ], component: ResumesHistoryComponent
      },
      {
        path: 'resumes/history/collect/:id',
        canActivate: [
          ComStatusCheckGuard
        ], component: ResumesCollectListComponent
      },
      {
        path: 'resumes/history/download/:id',
        canActivate: [
          ComStatusCheckGuard
        ], component: ResumesDownloadListComponent
      },
      { path: 'settings/organ', component: OrganizationComponent },
      {
        path: 'settings/account',
        canActivate: [
          ComStatusCheckGuard
        ], loadChildren: () => import('./settings/account-manage/account-manage.module').then(m => m.AccountManageModule)
      },

      { path: '**', redirectTo: 'positions' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyAdminRoutingModule { }
