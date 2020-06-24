import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { LayoutDefaultComponent } from './default/default.component';
import { HeaderStorageComponent } from './default/header/components/storage.component';
import { HeaderTaskComponent } from './default/header/components/task.component';
import { HeaderUserComponent } from './default/header/components/user.component';
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

const HEADERCOMPONENTS = [
  HeaderTaskComponent,
  HeaderStorageComponent,
  HeaderUserComponent
];

// passport
import { LayoutPassportComponent } from './passport/passport.component';
const PASSPORT = [
  LayoutPassportComponent
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
