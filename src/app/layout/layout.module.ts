import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { LayoutDefaultComponent } from './default/default.component';
import { HeaderStorageComponent } from './default/header/components/storage.component';
import { HeaderTaskComponent } from './default/header/components/task.component';
import { HeaderComponent } from './default/header/header.component';
import { SidebarComponent } from './default/sidebar/sidebar.component';
import { LayoutFullScreenComponent } from './fullscreen/fullscreen.component';

const SETTINGDRAWER = [];

const COMPONENTS = [
  LayoutDefaultComponent,
  LayoutFullScreenComponent,
  HeaderComponent,
  SidebarComponent,
  ...SETTINGDRAWER
];

import { WechatOfficeAccountComponent } from './default/header/components/wechat-office-account/wechat-office-account.component';

const HEADERCOMPONENTS = [
  HeaderTaskComponent,
  HeaderStorageComponent,
  UserComponent,
  WechatOfficeAccountComponent
];

// passport
import { LayoutPassportComponent } from './passport/passport.component';
import { UserComponent } from './default/header/components/user/user.component';
import { FooterComponent } from './default/footer/footer.component';

const PASSPORT = [
  LayoutPassportComponent,
  FooterComponent
];

@NgModule({
  imports: [SharedModule],
  declarations: [
    ...COMPONENTS,
    ...HEADERCOMPONENTS,
    ...PASSPORT
  ],
  exports: [
    ...COMPONENTS,
    ...PASSPORT
  ]
})
export class LayoutModule { }
