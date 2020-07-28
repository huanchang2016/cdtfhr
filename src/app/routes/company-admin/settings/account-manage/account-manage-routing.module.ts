import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountInfoComponent } from './account-info/account-info.component';
import { AccountManageComponent } from './account-manage.component';
import { LinkUserInfoComponent } from './link-user-info/link-user-info.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SubAccountSettingsComponent } from './sub-account-settings/sub-account-settings.component';


const routes: Routes = [
  { path: '', component: AccountManageComponent,
    children: [
      { path: '', redirectTo: 'info', pathMatch: 'full' },
      { path: 'info', component: AccountInfoComponent },
      { path: 'link', component: LinkUserInfoComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'sub-account', component: SubAccountSettingsComponent }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountManageRoutingModule { }
