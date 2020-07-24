import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { AccountManageRoutingModule } from './account-manage-routing.module';
import { AccountInfoComponent } from './account-info/account-info.component';


@NgModule({
  declarations: [AccountInfoComponent],
  imports: [
    SharedModule,
    AccountManageRoutingModule
  ]
})
export class AccountManageModule { }
