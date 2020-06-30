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

// #region third libs

const THIRDMODULES = [ ];

// #endregion

// #region your componets & directives

const COMPONENTS = [
    UserLoginComponent,
    CompanyLoginComponent,
    SubTitleShowComponent,
    // 复用表单组件
    DatePickerMonthComponent,
    DatePickerDateComponent,
    ThreeStageCascaderComponent
];
const DIRECTIVES = [];

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
  ]
})
export class SharedModule { }
