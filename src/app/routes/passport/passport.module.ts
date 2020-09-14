import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { PassportRoutingModule } from './passport-routing.module';

// single pages
// import { UserLockComponent } from './passport/lock/lock.component';
import { LoginComponent } from './login/login.component';
import { UserRegisterComponent } from './register/user/user.component';
import { CompanyRegisterComponent } from './register/company/company.component';

import { Step1Component } from './register/company/step1/step1.component';
import { Step2Component } from './register/company/step2/step2.component';
import { Step3Component } from './register/company/step3/step3.component';
import { Step4Component } from './register/company/step4/step4.component';


const COMPONENTS = [
  // passport pages
  LoginComponent,
  UserRegisterComponent,
  CompanyRegisterComponent
];

const COMPONENTSNOROUTES = [
  Step1Component,
  Step2Component,
  Step3Component,
  Step4Component,
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...COMPONENTSNOROUTES
  ],
  imports: [
    SharedModule,
    PassportRoutingModule
  ],
  entryComponents: [
    ...COMPONENTSNOROUTES
  ]
})
export class PassportModule { }
