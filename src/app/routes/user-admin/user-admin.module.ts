import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { UserAdminRoutingModule } from './user-admin-routing.module';
import { UserAdminLayoutComponent } from './user-admin-layout/user-admin-layout.component';
import { UserAdminHomeComponent } from './user-admin-home/user-admin-home.component';
import { UserSidebarComponent } from './component/user-sidebar/user-sidebar.component';
import { UserAdminCertificationComponent } from './user-admin-certification/user-admin-certification.component';
import { UserAdminBindAccountComponent } from './user-admin-bind-account/user-admin-bind-account.component';
import { UserContentTopComponent } from './component/user-content-top/user-content-top.component';


@NgModule({
  declarations: [
    UserAdminLayoutComponent, // 布局组件
    UserSidebarComponent, // 导航组件
    UserContentTopComponent, // 内容区顶部公共组件
    UserAdminHomeComponent, // 个人主页
    UserAdminCertificationComponent,
    UserAdminBindAccountComponent
  ],
  imports: [
    SharedModule,
    UserAdminRoutingModule
  ]
})
export class UserAdminModule { }
