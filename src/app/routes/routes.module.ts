import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { RouteRoutingModule } from './routes-routing.module';
// single pages
import { UserLockComponent } from './passport/lock/lock.component';
// passport pages
import { LoginComponent } from './passport/login/login.component';
import { UserRegisterComponent } from './passport/register/user/user.component';
import { CompanyRegisterComponent } from './passport/register/company/company.component';

import { HomePageComponent } from './home-page/home-page.component';
import { Step1Component } from './passport/register/company/step1/step1.component';
import { Step2Component } from './passport/register/company/step2/step2.component';
import { Step3Component } from './passport/register/company/step3/step3.component';
import { Step4Component } from './passport/register/company/step4/step4.component';

const COMPONENTS = [
  // passport pages
  LoginComponent,
  UserRegisterComponent,
  CompanyRegisterComponent,
  HomePageComponent,
  // single pages
  UserLockComponent,
];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [ SharedModule, RouteRoutingModule ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,
    Step1Component,
    Step2Component,
    Step3Component,
    Step4Component
  ],
})
export class RoutesModule {}
