import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SHARED_ZORRO_MODULES } from './shared-zorro.module';
import { UserLoginComponent } from './component/user-login/user-login.component';
import { CompanyLoginComponent } from './component/company-login/company-login.component';
import { SubTitleShowComponent } from './component/sub-title-show/sub-title-show.component';
import { DatePickerMonthComponent } from './component/forms/date-picker-month/date-picker-month.component';
import { DatePickerDateComponent } from './component/forms/date-picker-date/date-picker-date.component';
import { ThreeStageCascaderComponent } from './component/forms/three-stage-cascader/three-stage-cascader.component';
import { LayoutFullSearchComponent } from './component/layout-full-search/layout-full-search.component';
import { RecuritItemComponent } from './component/recurit-item/recurit-item.component';
import { PaginationItemComponent } from './component/pagination-item/pagination-item.component';
import { ShowTextAreaPipe } from './pipe/show-text-area.pipe';
import { ShowWeekendsPipe } from './pipe/show-weekends.pipe';
import { PostDeliverySuccessComponent } from './component/position-apply/post-delivery-success/post-delivery-success.component';
import { CelebrityNotPassComponent } from './component/position-apply/celebrity-not-pass/celebrity-not-pass.component';
import { UploadLogoComponent } from './component/forms/upload-logo/upload-logo.component';

// #region third libs

const THIRDMODULES = [];

// #endregion

// #region your componets & directives

const COMPONENTS = [
  UserLoginComponent,
  CompanyLoginComponent,
  SubTitleShowComponent,
  // 复用表单组件
  DatePickerMonthComponent,
  DatePickerDateComponent,
  ThreeStageCascaderComponent,
  LayoutFullSearchComponent,
  RecuritItemComponent,
  PaginationItemComponent,
  UploadLogoComponent
];

const ENTRYCOMPONENTS = [
  PostDeliverySuccessComponent,
  CelebrityNotPassComponent
];

const DIRECTIVES = [
  ShowTextAreaPipe,
  ShowWeekendsPipe
];

// #endregion

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ...SHARED_ZORRO_MODULES,
    // third libs
    ...THIRDMODULES
  ],
  declarations: [
    // your components
    ...COMPONENTS,
    ...ENTRYCOMPONENTS,
    ...DIRECTIVES
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ...SHARED_ZORRO_MODULES,
    // third libs
    ...THIRDMODULES,
    // your components
    ...COMPONENTS,
    ...DIRECTIVES
  ],
  entryComponents: [
    ...ENTRYCOMPONENTS
  ]
})
export class SharedModule { }
