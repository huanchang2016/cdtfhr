import { UsComponent } from './us/us.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutPageComponent } from './layout-page/layout-page.component';
import { LinkComponent } from './link/link.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { UserAgreementComponent } from './user-agreement/user-agreement.component';
import { CompanyAgreementComponent } from './company-agreement/company-agreement.component';


const routes: Routes = [
  {
    path: '', component: LayoutPageComponent,
    children: [
      { path: '', redirectTo: 'us', pathMatch: 'full' },
      { path: 'us', component: UsComponent, data: { title: '关于我们' } },
      { path: 'link', component: LinkComponent, data: { title: '联系我们' } },
      { path: 'privacy', component: PrivacypolicyComponent, data: { title: '隐私政策' } },
      { path: 'agreement-u', component: UserAgreementComponent, data: { title: '用户服务协议' } },
      { path: 'agreement-c', component: CompanyAgreementComponent, data: { title: '用户服务协议' } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
