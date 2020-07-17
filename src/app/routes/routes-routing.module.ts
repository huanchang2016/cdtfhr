import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@env/environment';
// layout
import { LayoutDefaultComponent } from '../layout/default/default.component';
import { LayoutFullScreenComponent } from '../layout/fullscreen/fullscreen.component';
import { LayoutPassportComponent } from '../layout/passport/passport.component';
// dashboard pages
// passport pages
import { LoginComponent } from './passport/login/login.component';
import { UserRegisterComponent } from './passport/register/user/user.component';
import { CompanyRegisterComponent } from './passport/register/company/company.component';
// single pages
import { UserLockComponent } from './passport/lock/lock.component';
import { HomePageComponent } from './home-page/home-page.component';

// Admin pages
import { LayoutAdminComponent } from '../layout/layout-admin/layout-admin.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutDefaultComponent,
    // canActivate: [SimpleGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomePageComponent },
      // tslint:disable-next-line: max-line-length
      { path: 'company', loadChildren: () => import('./company/company.module').then(m => m.CompanyModule) },
      { path: 'recruit', loadChildren: () => import('./recruit/recruit.module').then(m => m.RecruitModule) },
      { path: 'entrance', loadChildren: () => import('./entrance-examination/entrance-examination.module').then(m => m.EntranceExaminationModule) },
      // 业务子模块
    ]
  },
  // 全屏布局
  {
      path: 'fullscreen',
      component: LayoutFullScreenComponent,
      children: [
        { path: 'resume', loadChildren: () => import('./resume-view/resume-view.module').then( m => m.ResumeViewModule )}
      ]
  },

  // user admin
  {
    path: 'admin',
    component: LayoutAdminComponent,
    children: [
      { path: 'user', loadChildren: () => import('./user-admin/user-admin.module').then(m => m.UserAdminModule) }
    ]
  },
  // passport
  {
    path: 'passport',
    component: LayoutPassportComponent,
    children: [
      // { path: 'login', component: LoginComponent, data: { title: '登录' } },
      { path: 'register/user', component: UserRegisterComponent, data: { title: '个人注册' } },
      { path: 'register/company', component: CompanyRegisterComponent, data: { title: '企业注册' } },
      { path: 'lock', component: UserLockComponent, data: { title: '锁屏' } },
    ]
  },
  // 单页不包裹Layout
  { path: '**', redirectTo: 'exception/404' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes, {
        useHash: environment.useHash,
        // NOTICE: If you use `reuse-tab` component and turn on keepingScroll you can set to `disabled`
        // Pls refer to https://ng-alain.com/components/reuse-tab
        scrollPositionRestoration: 'top',
      }
    )],
  exports: [RouterModule],
})
export class RouteRoutingModule { }
