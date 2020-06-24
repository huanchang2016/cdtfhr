import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { RouteRoutingModule } from './routes-routing.module';
// single pages
import { UserLockComponent } from './passport/lock/lock.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterComponent } from './passport/register/register.component';
import { HomePageComponent } from './home-page/home-page.component';

const COMPONENTS = [
  // passport pages
  UserLoginComponent,
  UserRegisterComponent,
  // single pages
  UserLockComponent,
];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [ SharedModule, RouteRoutingModule ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,
    HomePageComponent
  ],
})
export class RoutesModule {}
