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
import { CarouselIndexComponent } from './home-page/carousel-index/carousel-index.component';
import { HotRecuritCarouselComponent } from './home-page/hot-recurit-carousel/hot-recurit-carousel.component';
import { IngRecuritCarouselComponent } from './home-page/ing-recurit-carousel/ing-recurit-carousel.component';
import { FriendlyLinkComponent } from './home-page/friendly-link/friendly-link.component';
import { AgreementPageComponent } from './passport/agreement-page/agreement-page.component';

const COMPONENTS = [
  // passport pages
  LoginComponent,
  UserRegisterComponent,
  CompanyRegisterComponent,
  AgreementPageComponent,
  HomePageComponent,
  // single pages
  UserLockComponent,
];
const COMPONENTS_NOROUNT = [
  // 企业注册 分布表单
  Step1Component,
  Step2Component,
  Step3Component,
  Step4Component,
  // 首页子组件
  CarouselIndexComponent,
  HotRecuritCarouselComponent,
  IngRecuritCarouselComponent,
  FriendlyLinkComponent
];

@NgModule({
  imports: [ SharedModule, RouteRoutingModule ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,
  ],
})
export class RoutesModule {}
