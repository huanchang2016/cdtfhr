import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { AboutRoutingModule } from './about-routing.module';

import { LayoutPageComponent } from './layout-page/layout-page.component';

import { UsComponent } from './us/us.component';
import { LinkComponent } from './link/link.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { UserAgreementComponent } from './user-agreement/user-agreement.component';
import { CompanyAgreementComponent } from './company-agreement/company-agreement.component';

const COMPONENTS = [
  LayoutPageComponent,
  UsComponent,
  LinkComponent,
  PrivacypolicyComponent,
  UserAgreementComponent,
  CompanyAgreementComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    SharedModule,
    AboutRoutingModule
  ]
})
export class AboutModule { }
