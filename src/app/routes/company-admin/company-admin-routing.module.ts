import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyAdminLayoutComponent } from './company-admin-layout/company-admin-layout.component';
import { CompanyAdminHomeComponent } from './company-center/company-admin-home/company-admin-home.component';
import { PositionListComponent } from './positions-manage/position-list/position-list.component';
import { PositionCreateComponent } from './positions-manage/position-create/position-create.component';
import { ResumesListComponent } from './resumes-manage/resumes-list/resumes-list.component';
import { ResumesHandleComponent } from './resumes-manage/resumes-handle/resumes-handle.component';
import { ResumesHistoryComponent } from './resumes-manage/resumes-history/resumes-history.component';
import { OrganizationComponent } from './settings/organization/organization.component';


const routes: Routes = [
  { path: '', component: CompanyAdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: CompanyAdminHomeComponent },
      { path: 'positions', component: PositionListComponent },
      // { path: 'position/create', component: PositionCreateComponent },
      { path: 'resumes/search', component: ResumesListComponent },
      { path: 'resumes/handle', component: ResumesHandleComponent },
      { path: 'resumes/history', component: ResumesHistoryComponent },
      { path: 'settings/organ', component: OrganizationComponent },
      { path: 'settings/account', loadChildren: () => import('./settings/account-manage/account-manage.module').then(m => m.AccountManageModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyAdminRoutingModule { }
