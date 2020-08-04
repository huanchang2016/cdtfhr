import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserAdminLayoutComponent } from './user-admin-layout/user-admin-layout.component';
import { UserAdminHomeComponent } from './user-center/user-admin-home/user-admin-home.component';
import { UserAdminCertificationComponent } from './user-center/user-admin-certification/user-admin-certification.component';
import { UserAdminBindAccountComponent } from './user-center/user-admin-bind-account/user-admin-bind-account.component';
import { ResumeListComponent } from './resume-manage/resume-list/resume-list.component';
import { ResumeCreateComponent } from './resume-manage/resume-create/resume-create.component';
import { ResumeEditComponent } from './resume-manage/resume-edit/resume-edit.component';
import { AuthenticationGuard } from './guard/authentication.guard';
import { UserAdminGuard } from './guard/user-admin.guard';
import { UserAdminHomeGuard } from './guard/user-admin-home.guard';


const routes: Routes = [
  {
    path: '', component: UserAdminLayoutComponent,
    canActivate: [UserAdminGuard],

    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        canActivate: [
          UserAdminHomeGuard
        ],
        component: UserAdminHomeComponent
      },
      { path: 'certification', component: UserAdminCertificationComponent },
      {
        path: 'bind',
        canActivate: [
          AuthenticationGuard
        ],
        component: UserAdminBindAccountComponent
      },
      {
        path: 'resumes',
        canActivate: [
          AuthenticationGuard
        ], component: ResumeListComponent
      },
      {
        path: 'resumes/add',
        canActivate: [
          AuthenticationGuard
        ], component: ResumeCreateComponent
      },
      {
        path: 'resumes/edit/:id',
        canActivate: [
          AuthenticationGuard
        ], component: ResumeEditComponent
      },
      {
        path: 'delivery',
        canActivate: [
          AuthenticationGuard
        ], loadChildren: () => import('./resume-delivery-manage/resume-delivery-manage.module').then(m => m.ResumeDeliveryManageModule)
      },
      { path: '***', redirectTo: '/' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAdminRoutingModule { }
