import { NgModule } from '@angular/core';
import { UsComponent } from './us/us.component';
import { LinkComponent } from './link/link.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { UserAgreementComponent } from './user-agreement/user-agreement.component';
import { LayoutPageComponent } from './layout-page/layout-page.component';
import { SharedModule } from '@shared';
import { AboutRoutingModule } from './about-routing.module';

const COMPONENTS = [
  LayoutPageComponent,
  UsComponent,
  LinkComponent,
  PrivacypolicyComponent,
  UserAgreementComponent
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
