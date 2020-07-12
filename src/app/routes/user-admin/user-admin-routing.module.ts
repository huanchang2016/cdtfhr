import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserAdminLayoutComponent } from './user-admin-layout/user-admin-layout.component';
import { UserAdminHomeComponent } from './user-admin-home/user-admin-home.component';
import { UserAdminCertificationComponent } from './user-admin-certification/user-admin-certification.component';
import { UserAdminBindAccountComponent } from './user-admin-bind-account/user-admin-bind-account.component';
import { ResumeListComponent } from './resume-manage/resume-list/resume-list.component';
import { ResumeCreateComponent } from './resume-manage/resume-create/resume-create.component';


const routes: Routes = [
  { path: '', component: UserAdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: UserAdminHomeComponent },
      { path: 'certification', component: UserAdminCertificationComponent },
      { path: 'bind', component: UserAdminBindAccountComponent },
      { path: 'resumes', component: ResumeListComponent },
      { path: 'resumes/add', component: ResumeCreateComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAdminRoutingModule { }
