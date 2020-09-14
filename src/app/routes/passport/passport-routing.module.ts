import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { UserRegisterComponent } from './register/user/user.component';
import { CompanyRegisterComponent } from './register/company/company.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { title: '登录' } },
  { path: 'register/user', component: UserRegisterComponent, data: { title: '个人注册' } },
  { path: 'register/company', component: CompanyRegisterComponent, data: { title: '企业注册' } }
  // { path: 'lock', component: UserLockComponent, data: { title: '锁屏' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PassportRoutingModule { }
