import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { AccountManageRoutingModule } from './account-manage-routing.module';
import { AccountInfoComponent } from './account-info/account-info.component';
import { AccountManageComponent } from './account-manage.component';
import { LinkUserInfoComponent } from './link-user-info/link-user-info.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SubAccountSettingsComponent } from './sub-account-settings/sub-account-settings.component';
import { SourceInfoFormComponent } from './account-info/source-info-form/source-info-form.component';
import { SubAccountFormCComponent } from './sub-account-settings/sub-account-form-c/sub-account-form-c.component';

const COMPONENTS = [
  AccountInfoComponent,
  AccountManageComponent,
  LinkUserInfoComponent,
  ChangePasswordComponent,
  SubAccountSettingsComponent
];

const ENTRYCOMPONENTS = [
  SourceInfoFormComponent,
  SubAccountFormCComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...ENTRYCOMPONENTS
  ],
  imports: [
    SharedModule,
    AccountManageRoutingModule
  ]
})
export class AccountManageModule { }
